import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

import App from "./App";
import { StateContextProvider } from "./context";

root.render(
  <ThirdwebProvider activeChain={Sepolia}>
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
