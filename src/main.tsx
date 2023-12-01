import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";

import amplifyconfig from "./amplifyconfiguration.json";
Amplify.configure(amplifyconfig);

const existingConfig = Amplify.getConfig();

console.log("first config", existingConfig);
Amplify.configure({
  ...existingConfig,
  API: {
    ...existingConfig.API,
    REST: {
      ...existingConfig.API?.REST,
      MyApi: {
        endpoint:
          "https://8omevpz26l.execute-api.us-east-1.amazonaws.com/test/mock",
        region: "[REGION]",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
