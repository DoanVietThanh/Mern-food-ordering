import { useGetCurrentUser } from "@/api/userAPI/UserAPI";
import FormUserProfile, { UserFormData } from "@/components/forms/UserProfile/FormUserProfile";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

type CheckoutButtonProps = {
  disabled: boolean;
  isLoading: boolean;
  onCheckout: (userFormDataa: UserFormData) => void;
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: CheckoutButtonProps) => {
  const { pathname } = useLocation();
  const { currentUser, isLoading: isGetCurrentUserLoading } = useGetCurrentUser();
  const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0();

  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: pathname, // redirect to current page
      },
    });
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-orange-500 flex-1">
        Login to checkout
      </Button>
    );
  }

  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-500 flex-1">
          Go to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <FormUserProfile
          onSave={onCheckout}
          currentUser={currentUser}
          isLoading={isGetCurrentUserLoading}
          title="Confirm Deliery Details"
          buttonText="Continue to payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
