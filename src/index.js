import React from "react";
import ReactDOM from "react-dom";
import { AppUi } from "./App";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <AppUi />
    </ChakraProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
