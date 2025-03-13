import { createReactOidc } from "oidc-spa/react";

export const { OidcProvider, useOidc, getOidc } = createReactOidc(async () => ({
  issuerUri: `${import.meta.env.VITE_KEYCLOAK_URL}/realms/${
    import.meta.env.VITE_KEYCLOAK_REALM
  }`,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  homeUrl: import.meta.env.BASE_URL,
  autoLogin: true,
}));
