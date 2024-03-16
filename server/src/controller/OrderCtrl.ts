import { Request, Response } from "express";
import Stripe from "stripe";
import { MenuItemType, RestaurantModel } from "../model/restaurantModel";
import { OrderModel } from "../model/orderModel";

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const existingOrders = await OrderModel.find({ user: req.userId }).populate("user").populate("restaurant");
    if (!existingOrders) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.json(existingOrders);
  } catch (error: any) {
    return res.status(500).json({ message: "Fail to get orders" });
  }
};

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;
    const restaurant = await RestaurantModel.findById(checkoutSessionRequest.restaurantId);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    const newOrder = new OrderModel({
      restaurant: restaurant,
      user: req.userId,
      status: "placed",
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      createdAt: new Date(),
    });
    const lineItems = createLineItems(checkoutSessionRequest, restaurant.menuItems);
    const session = await createSession(
      lineItems,
      newOrder._id.toString(),
      restaurant.deliveryPrice,
      restaurant._id.toString()
    );
    if (!session.url) {
      return res.status(500).json({ message: "Error creating stripe session" });
    }
    await newOrder.save();
    res.json({ url: session.url });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.raw.message });
  }
};

export const stripeWebhookHandler = async (req: Request, res: Response) => {
  let event;
  try {
    const sig = req.headers["stripe-signature"];
    event = STRIPE.webhooks.constructEvent(req.body, sig as string, STRIPE_ENDPOINT_SECRET);
  } catch (error: any) {
    console.log(error);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }
  if (event.type === "checkout.session.completed") {
    const order = await OrderModel.findById(event.data.object.metadata?.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.totalAmount = event.data.object.amount_total;
    order.status = "paid";
    await order.save();
  }
  res.status(200).send();
};

const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: MenuItemType[]) => {
  const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find((item) => item._id.toString() === cartItem.menuItemId.toString());
    if (!menuItem) {
      throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
    }
    const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "gbp",
        unit_amount: menuItem.price,
        product_data: {
          name: menuItem.name,
        },
      },
      quantity: parseInt(cartItem.quantity),
    };
    return line_item;
  });

  return lineItems;
};

const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
  deliveryPrice: number,
  restaurantId: string
) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: {
            amount: deliveryPrice,
            currency: "gbp",
          },
        },
      },
    ],
    mode: "payment",
    metadata: {
      // metadata -> the observed data again
      orderId,
      restaurantId,
    },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/detail-restaurant/${restaurantId}?cancelled=true`,
  });

  return sessionData;
};

// RECEIVED EVENT
// =========
// stripeWebhookHandler -> req.body (event):  {
//   id: 'evt_3OuZFuJZykFaowyv064DrrjT',
//   object: 'event',
//   api_version: '2023-10-16',
//   created: 1710503338,
//   data: {
//     object: {
//       id: 'pi_3OuZFuJZykFaowyv0soM0eKM',
//       object: 'payment_intent',
//       amount: 3000,
//       amount_capturable: 0,
//       amount_details: [Object],
//       amount_received: 0,
//       application: null,
//       application_fee_amount: null,
//       automatic_payment_methods: null,
//       canceled_at: null,
//       cancellation_reason: null,
//       capture_method: 'automatic',
//       client_secret: 'pi_3OuZFuJZykFaowyv0soM0eKM_secret_SP5y2afCynA217nXOnjSEmK81',
//       confirmation_method: 'automatic',
//       created: 1710503338,
//       currency: 'usd',
//       customer: null,
//       description: null,
//       invoice: null,
//       last_payment_error: null,
//       latest_charge: null,
//       livemode: false,
//       metadata: {},
//       next_action: null,
//       on_behalf_of: null,
//       payment_method: null,
//       payment_method_configuration_details: null,
//       payment_method_options: [Object],
//       payment_method_types: [Array],
//       processing: null,
//       receipt_email: null,
//       review: null,
//       setup_future_usage: null,
//       shipping: [Object],
//       source: null,
//       statement_descriptor: null,
//       statement_descriptor_suffix: null,
//       status: 'requires_payment_method',
//       transfer_data: null,
//       transfer_group: null
//     }
//   },
//   livemode: false,
//   pending_webhooks: 2,
//   request: {
//     id: 'req_9zCJiHD3LOUnKk',
//     idempotency_key: '866171c2-9fb0-4c2d-8413-3fd0cbdfec30'
//   },
//   type: 'payment_intent.created'
// }
