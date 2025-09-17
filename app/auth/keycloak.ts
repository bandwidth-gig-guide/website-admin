import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: process.env.KEYCLOAK_URL || "invalid",
  realm: process.env.KEYCLOAK_REALM || "invalid",
  clientId: process.env.KEYCLOAK_CLIENT_ID || "invalid",
});
