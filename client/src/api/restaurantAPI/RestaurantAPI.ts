import { Restaurant } from "@/types/restaurant.types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    console.log("API restaurantFormData: ", restaurantFormData);

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
