import type { ReactNode } from 'react';
import { createContext, useContext } from 'react';

function createContextFactory<TValue>(defaultValue?: TValue) {
  const Context = createContext<TValue | undefined>(defaultValue);

  function Provider({
    value,
    children,
  }: {
    value: TValue;
    children: ReactNode;
  }) {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  function useCustomContext() {
    const ctx = useContext(Context);
    if (!ctx) {
      throw new Error('useCustomContext must be used within a Provider');
    }
    return ctx;
  }

  return [Provider, useCustomContext] as const;
}

export { createContextFactory };
