import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import { CookieStorage } from "aws-amplify/utils";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";

import amplifyconfig from "./amplifyconfiguration.json";
Amplify.configure(amplifyconfig);

cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
