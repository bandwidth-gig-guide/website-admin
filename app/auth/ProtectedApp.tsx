import React, { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';

interface Props {
  children: React.ReactNode;
}

export const ProtectedApp: React.FC<Props> = ({ children }) => {
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    if (initialized && keycloak && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [initialized, keycloak]);

  return <>{children}</>;
};
