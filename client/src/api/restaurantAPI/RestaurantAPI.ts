import { SearchState } from "@/pages/SearchPage/SearchPage";
import { Order } from "@/types/order.types";
import { Restaurant, RestaurantSearchResponse } from "@/types/restaurant.types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

// Hook: useGetMyRestaurant
export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };
  const { data: restaurant, isLoading, error } = useQuery("fetchMyRestaurant", getMyRestaurantRequest);
  if (error) toast.error("Unable to get restaurant");
  return { restaurant, isLoading };
};

// Hook: useGetMyRestaurantOrder
export const useGetMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestaurantOrderRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/restaurant/order`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Fail to get restaurant order");
    }
    return response.json();
  };
  const { data: myRestaurantOrder, isLoading, error } = useQuery("fetchMyRestaurantOrder", getMyRestaurantOrderRequest);
  if (error) toast.error("Fail to get restaurant order");
  return {
    myRestaurantOrder,
    isLoading,
  };
};

// Hook: useUpdateMyRestaurantOrder
export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyRestaurantOrder = async (updateStatusOrderRequest: UpdateOrderStatusRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/restaurant/order/${updateStatusOrderRequest.orderId}/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: updateStatusOrderRequest.status }),
    });
    if (!response.ok) {
      throw new Error("Failed to update status");
    }
    return response.json();
  };
  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyRestaurantOrder);
  if (isSuccess) toast.success("Order updated");
  if (isError) {
    toast.error("Unable to update order");
    reset();
  }
  return { updateRestaurantStatus, isLoading };
};

// Hook: useCreateMyRestaurant
export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });
    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }
    return response.json();
  };
  const { mutateAsync: createRestaurant, isSuccess, error, isLoading } = useMutation(createRestaurantRequest);
  if (isSuccess) toast.success("Restaurant created!");
  if (error) toast.error("Unable to update restaurant");

  return { createRestaurant, isLoading };
};

// Hook: useUpdateMyRestaurant
export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });
    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }
    return response.json();
  };
  const { mutateAsync: updateRestaurant, isLoading, error, isSuccess } = useMutation(updateMyRestaurantRequest);
  if (isSuccess) toast.success("Restaurant updated");
  if (error) toast.error("Fail to update restaurant");
  return {
    updateRestaurant,
    isLoading,
  };
};

// Hook: useSearchRestaurant
export const useSearchRestaurants = (searchState: SearchState, city?: string) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("page", searchState.page.toString());
    params.set("sortOption", searchState.sortOption);
    params.set("searchQuery", searchState.searchQuery);
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));

    const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`);
    if (!response.ok) {
      throw new Error("Failed to show restaurants");
    }
    return response.json();
  };

  const {
    data: searchedRestaurants,
    isLoading,
    error,
  } = useQuery(["searchRestaurants", searchState], createSearchRequest, { enabled: !!city });
  if (error) toast.error("Fail to show restaurants");
  return { searchedRestaurants, isLoading };
};

// Hook: useGetRestaurant
export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantRequest = async (): Promise<Restaurant> => {
    const response = await fetch(`${API_BASE_URL}/api/restaurant/detail/${restaurantId}`);
    if (!response.ok) {
      throw new Error("Fail to show restaurant");
    }
    return response.json();
  };
  const {
    data: restaurant,
    isLoading,
    error,
  } = useQuery("fetchDetailRestaurant", getRestaurantRequest, {
    enabled: !!restaurantId,
  });
  if (error) toast.error("Fail to show restaurant");
  return { restaurant, isLoading };
};
