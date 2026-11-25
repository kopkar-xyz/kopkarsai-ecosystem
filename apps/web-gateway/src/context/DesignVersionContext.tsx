import React, { createContext, useContext, useState } from 'react';

export type GatewayDesignVersion = 'v1' | 'v2' | 'v3';

interface DesignVersionContextType {
  version: GatewayDesignVersion;
  setVersion: (version: GatewayDesignVersion) => void;
}

const STORAGE_KEY = 'kopkarsai_gateway_design_version';

const DesignVersionContext = createContext<DesignVersionContextType>({
  version: 'v3',
  setVersion: () => {},
});

export const useDesignVersion = () => useContext(DesignVersionContext);

function getInitialVersion(): GatewayDesignVersion {
  if (typeof window === 'undefined') return 'v3';
  const param = new URLSearchParams(window.location.search).get('v');
  if (param === '1' || param === 'v1') return 'v1';
  if (param === '2' || param === 'v2') return 'v2';
  if (param === '3' || param === 'v3') return 'v3';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'v1' || saved === 'v2' || saved === 'v3') return saved;
  } catch {
    // ignore storage errors
  }
  return 'v3';
}

export const DesignVersionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [version, setVersionState] = useState<GatewayDesignVersion>(getInitialVersion);

  const setVersion = (next: GatewayDesignVersion) => {
    setVersionState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage errors
    }
  };

  return (
    <DesignVersionContext.Provider value={{ version, setVersion }}>
      <div data-gateway-version={version}>{children}</div>
    </DesignVersionContext.Provider>
  );
};
