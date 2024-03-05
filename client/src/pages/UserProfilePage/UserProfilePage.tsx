import { useUpdateUser } from "@/api/userAPI/UserAPI";
import FormUserProfile from "@/components/forms/UserProfile/FormUserProfile";

const UserProfilePage = () => {
  const { updateUser, isLoading } = useUpdateUser();

  return <FormUserProfile isLoading={isLoading} onSave={updateUser} />;
};

export default UserProfilePage;
