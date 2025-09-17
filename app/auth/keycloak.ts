import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: process.env.KEYCLOAK_URL || "http://auth.localhost",
  realm: process.env.KEYCLOAK_REALM || "bandwidth.dev",
  clientId: process.env.KEYCLOAK_CLIENT_ID || "admin.localhost",
});
