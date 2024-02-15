import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";

Amplify.configure(config);

const initConfig = Amplify.getConfig();

Amplify.configure({
  ...initConfig,
  API: {
    REST: {
      api: {
        endpoint: config.aws_cloud_logic_custom[0].endpoint,
        //'https://abcdefghij1234567890.execute-api.us-east-1.amazonaws.com/stageName',
        region: "us-east-1", // Optional
      },
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
