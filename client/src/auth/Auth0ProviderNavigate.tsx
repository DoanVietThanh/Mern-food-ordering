import { ReactNode } from "react";

import { AppState, Auth0Provider, User } from "@auth0/auth0-react";

type Auth0ProviderNavigateProps = {
  children: ReactNode;
};

const Auth0ProviderNavigate = ({ children }: Auth0ProviderNavigateProps) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  // const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId || !redirectUri) {
    throw new Error("unable to initialise auth");
  }

  const onRedirectCallback = (appState?: AppState, user?: User) => {
    console.log("user: ", user);
    console.log("appState: ", appState);

    // navigate(appState?.returnTo || "/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderNavigate;
