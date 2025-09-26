import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || "http://auth.localhost",
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "bandwidth.dev",
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "admin.localhost",
});
