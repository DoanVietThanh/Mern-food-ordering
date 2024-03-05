import { CreateUserRequest } from "./UserAPI.types";
import { User } from "@/types/user.types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type UpdateUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useGetCurrentUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getCurrentUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
    return response.json();
  };

  const { data: currentUser, isLoading, isError, isSuccess } = useQuery("fetchCurrentUser", getCurrentUserRequest);
  return {
    currentUser,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const createUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  };

  const { mutateAsync: createUser, isLoading, error } = useMutation(createUserRequest);
  if (error) {
    toast.error(error.toString());
  }
  return {
    createUser,
    isLoading,
  };
};

export const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateUserRequest = async (formData: UpdateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    console.log("formData: ", formData);
    console.log("accessToken: ", accessToken);
    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    return response.json();
  };
  const { mutateAsync: updateUser, isLoading, isSuccess, error, reset } = useMutation(updateUserRequest);
  if (isSuccess) toast.success("User profile updated!");
  if (error) {
    toast.error(error.toString());
    reset();
  }
  return { updateUser, isLoading };
};
