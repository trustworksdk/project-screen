import React, { createContext, useContext, useState } from 'react';

const ToolContext = createContext();

export const ToolProvider = ({ children }) => {
  const [selectedTool, setSelectedTool] = useState("");

  const updateSelectedTool = (tool) => {
    setSelectedTool(tool);
  };

  return (
    <ToolContext.Provider value={{ selectedTool, setSelectedTool, updateSelectedTool }}>
      {children}
    </ToolContext.Provider>
  );
};

export const useToolContext = () => {
  return useContext(ToolContext);
};

