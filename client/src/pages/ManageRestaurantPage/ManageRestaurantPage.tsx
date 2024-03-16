import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrder,
  useUpdateMyRestaurant,
} from "@/api/restaurantAPI/RestaurantAPI";
import FormManageRestaurant from "@/components/forms/ManageRestaurant/FormManageRestaurant";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ManageRestaurantPage = () => {
  const { restaurant } = useGetMyRestaurant();
  const { createRestaurant, isLoading: isLoadingCreateRestaurant } = useCreateMyRestaurant();
  const { updateRestaurant, isLoading: isLoadingUpdateRestaurant } = useUpdateMyRestaurant();

  const { myRestaurantOrder } = useGetMyRestaurantOrder();
  const isExistingRestaurant = !!restaurant;

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent value="orders" className="space-y-5 bg-gray-50 p-10 rounded-lg">
        <h2 className="text-2xl font-bold">{myRestaurantOrder?.length} active orders</h2>
        {myRestaurantOrder?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <FormManageRestaurant
          restaurant={restaurant}
          onSave={isExistingRestaurant ? updateRestaurant : createRestaurant}
          isLoading={isLoadingCreateRestaurant || isLoadingUpdateRestaurant}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
