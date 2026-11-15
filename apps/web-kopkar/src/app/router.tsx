import React, { createContext, useContext, useState, useEffect } from 'react';

export type RoutePath =
  | '/'
  | '/orders'
  | '/products'
  | '/products/new'
  | '/products/detail'
  | '/financial'
  | '/profile';

interface RouterContextType {
  currentPath: RoutePath;
  navigate: (path: RoutePath) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: '/',
  navigate: () => {},
});

export const useRouter = () => useContext(RouterContext);

interface RouterProviderProps {
  children: React.ReactNode;
}

const VALID_PATHS: RoutePath[] = [
  '/',
  '/orders' as RoutePath,
  '/products' as RoutePath,
  '/products/new' as RoutePath,
  '/products/detail' as RoutePath,
  '/financial' as RoutePath,
  '/profile' as RoutePath,
];

export const RouterProvider: React.FC<RouterProviderProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() => {
    const hash = window.location.hash.replace('#', '') as RoutePath;
    if (VALID_PATHS.includes(hash)) {
      return hash;
    }
    return '/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as RoutePath;
      if (VALID_PATHS.includes(hash)) {
        setCurrentPath(hash);
      } else {
        setCurrentPath('/');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: RoutePath) => {
    window.location.hash = path;
    setCurrentPath(path);
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: RoutePath;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

export const Link: React.FC<LinkProps> = ({
  to,
  children,
  className = '',
  activeClassName = '',
  ...props
}) => {
  const { currentPath, navigate } = useRouter();
  const isActive = currentPath === to;

  return (
    <a
      href={`#${to}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
      className={`${className} ${isActive ? activeClassName : ''}`}
      {...props}
    >
      {children}
    </a>
  );
};
