import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@fontsource/poppins/300.css";
import "@fontsource/nunito/500.css";

import theme from "./theme";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Description } from "./Description";
import { ImageContextProvider } from "./image-context";

// const ContextImage = React.createContext({ name: "nacho" });
// const [context, setContext] = React.useState({ name: "nacho" });

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ImageContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="d" element={<Description />}>
              <Route path=":id" element={<Description />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ImageContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
