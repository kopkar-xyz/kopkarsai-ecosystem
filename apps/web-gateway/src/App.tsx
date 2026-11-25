import React from 'react';
import { GatewayPage } from './pages/GatewayPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { GatewayRouterProvider, useGatewayRouter } from './router';
import { DesignVersionProvider } from './context/DesignVersionContext';
import { DesignVersionSwitcher } from './components/layout/DesignVersionSwitcher';

const GatewayRouteView: React.FC = () => {
  const { currentPath } = useGatewayRouter();

  if (currentPath === '/login') return <LoginPage />;
  if (currentPath === '/register') return <RegisterPage />;
  return <GatewayPage />;
};

export function App() {
  return (
    <DesignVersionProvider>
      <GatewayRouterProvider>
        <DesignVersionSwitcher />
        <GatewayRouteView />
      </GatewayRouterProvider>
    </DesignVersionProvider>
  );
}

export default App;
