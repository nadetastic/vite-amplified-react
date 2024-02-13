import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import config from "./amplifyconfiguration.json";
// import { fetchAuthSession } from "aws-amplify/auth";
// import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
// import { defaultStorage, CookieStorage } from "aws-amplify/utils";

const configureAmplify = () => {
  // Amplify.configure({
  //   Auth: {
  //     Cognito: {
  //       identityPoolId: config.aws_cognito_identity_pool_id,
  //       userPoolId: config.aws_user_pools_id,
  //       userPoolClientId: config.aws_user_pools_web_client_id,
  //       loginWith: {
  //         oauth: {
  //           domain: config.oauth.domain,
  //           scopes: ["email", "profile", "openid"],
  //           redirectSignIn: ["http://localhost:3000/"],
  //           redirectSignOut: ["http://localhost:3000/"],
  //           responseType: "code",
  //         },
  //       },
  //     },
  //   },
  // });

  Amplify.configure(config);

  // cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage());
};

configureAmplify();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
