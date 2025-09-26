import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || "https://auth.bandwidth.melbourne",
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "bandwidth",
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "admin.bandwidth.melbourne",
});
