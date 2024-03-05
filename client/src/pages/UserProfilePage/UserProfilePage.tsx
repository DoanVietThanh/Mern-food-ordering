import { useGetCurrentUser, useUpdateUser } from "@/api/userAPI/UserAPI";
import FormUserProfile from "@/components/forms/UserProfile/FormUserProfile";

const UserProfilePage = () => {
  const { currentUser, isLoading: isLoadingGet } = useGetCurrentUser();
  const { updateUser, isLoading: isLoadingUpdate } = useUpdateUser();

  if (!currentUser) {
    return <div>Unable to load user profile...</div>;
  }

  if (isLoadingGet) {
    return <div>Loading...</div>;
  }

  return <FormUserProfile currentUser={currentUser} isLoading={isLoadingUpdate} onSave={updateUser} />;
};

export default UserProfilePage;
