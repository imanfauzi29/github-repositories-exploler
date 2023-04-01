import React from "react";
import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Router from "./routes";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  const theme = extendTheme({});
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Router />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
