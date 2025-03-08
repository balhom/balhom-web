import Keycloak from "keycloak-js";
import { authSessionInstance } from "../../modules/auth/services/instances";

export const keycloakInstance = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

keycloakInstance.init().then((authenticated) => {
  if (authenticated) {
    authSessionInstance.accessToken = keycloakInstance.token ?? null;
  }
});

// Update access token when it expires
keycloakInstance.onTokenExpired = () => {
  keycloakInstance.updateToken().then(() => {
    authSessionInstance.accessToken = keycloakInstance.token ?? null;
  });
};
