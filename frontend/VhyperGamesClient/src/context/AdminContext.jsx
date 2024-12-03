import { createContext } from "react";

// Crear el contexto
export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {

  const contextValue = {

  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};