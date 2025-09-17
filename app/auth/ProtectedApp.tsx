import React, { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';

interface Props {
  children: React.ReactNode;
}

export const ProtectedApp: React.FC<Props> = ({ children }) => {
  const { keycloak, initialized } = useKeycloak();
  const isDevEnvironment = process.env.NEXT_PUBLIC_APP_MODE === 'development';

  useEffect(() => {
    if (!isDevEnvironment && initialized && keycloak && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [initialized, keycloak, isDevEnvironment]);

  return <>{children}</>;
};
