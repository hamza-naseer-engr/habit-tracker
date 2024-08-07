// src/AppContext.tsx
import React, { createContext, useState, ReactNode, FC } from 'react';

interface AppContextProps {
  someState: string;
  setSomeState: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [someState, setSomeState] = useState('default value');

  return (
    <AppContext.Provider value={{ someState, setSomeState }}>
      {children}
    </AppContext.Provider>
  );
};
