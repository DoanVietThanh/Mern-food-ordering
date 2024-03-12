import { Restaurant } from "@/types/restaurant.types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
