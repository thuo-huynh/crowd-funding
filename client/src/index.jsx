import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

import App from "./App";
import { StateContextProvider } from "./context";

root.render(
  <ThirdwebProvider chainId={11155111}>
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
