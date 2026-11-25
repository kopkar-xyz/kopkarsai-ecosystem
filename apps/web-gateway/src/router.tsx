import React, { createContext, useContext, useEffect, useState } from 'react';

export type GatewayRoutePath = '/' | '/login' | '/register';

interface GatewayRouterContextType {
  currentPath: GatewayRoutePath;
  navigate: (path: GatewayRoutePath) => void;
}

const GatewayRouterContext = createContext<GatewayRouterContextType>({
  currentPath: '/',
  navigate: () => {},
});

export const useGatewayRouter = () => useContext(GatewayRouterContext);

function resolveCurrentRoute(): GatewayRoutePath {
  const hash = window.location.hash.replace('#', '');
  if (hash === '/login' || hash === '/register' || hash === '/') {
    return hash;
  }
  const pathname = window.location.pathname;
  if (pathname === '/login' || pathname === '/register') {
    return pathname;
  }
  return '/';
}

export const GatewayRouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<GatewayRoutePath>(resolveCurrentRoute);

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(resolveCurrentRoute());
    };
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const navigate = (path: GatewayRoutePath) => {
    window.location.hash = path === '/' ? '' : path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <GatewayRouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </GatewayRouterContext.Provider>
  );
};
