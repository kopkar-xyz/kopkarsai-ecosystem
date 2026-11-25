import React from 'react';
import { RouterProvider } from './router';
import { RoleProvider } from './auth/RoleContext';
import { ProductStoreProvider } from '../features/product-submission/context/ProductStoreContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ProductStoreProvider>
      <RouterProvider>
        <RoleProvider>{children}</RoleProvider>
      </RouterProvider>
    </ProductStoreProvider>
  );
};
