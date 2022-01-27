import * as React from "react";

export const ContextImage = React.createContext();

export function ImageContextProvider({ children }) {
  const [image, setImages] = React.useState([]);
  return (
    <ContextImage.Provider value={{ image, setImages }}>
      {children}
    </ContextImage.Provider>
  );
}
