import React, { createContext, useContext, useState, useEffect } from 'react';

export type RoutePath = '/' | '/orders' | '/checkout' | '/cashier' | '/help';

interface RouterContextType {
  currentPath: RoutePath;
  navigate: (path: RoutePath) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
});

export const useRouter = () => useContext(RouterContext);

const VALID_PATHS: RoutePath[] = ['/', '/orders', '/checkout', '/cashier', '/help'];

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() => {
    if (typeof window === 'undefined') return '/';
    const hash = window.location.hash.replace('#', '') as RoutePath;
    return VALID_PATHS.includes(hash) ? hash : '/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as RoutePath;
      setCurrentPath(VALID_PATHS.includes(hash) ? hash : '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: RoutePath) => {
    if (typeof window !== 'undefined') {
      window.location.hash = path;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentPath(path);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};
