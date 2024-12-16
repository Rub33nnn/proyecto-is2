import React, { createContext, useState, useContext } from 'react';

// Crear el contexto para las configuraciones globales
const ConfiguracionContext = createContext();

// Hook para acceder al contexto de configuraciones
export const useConfiguracion = () => {
  return useContext(ConfiguracionContext);
};

// Proveedor del contexto
export const AppContext = ({ children }) => {
  const [config, setConfig] = useState({
    notifications: true,
    theme: 'Claro',
    chatFontSize: 16
  });

  // Función para actualizar las configuraciones
  const updateConfig = (newConfig) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      ...newConfig,
    }));
  };

  return (
    <ConfiguracionContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfiguracionContext.Provider>
  );
};
