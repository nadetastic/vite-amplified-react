// import { useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";

import {
  signIn,
  signUp,
  confirmSignUp,
  getCurrentUser,
  fetchMFAPreference,
  fetchDevices,
  signOut,
} from "aws-amplify/auth";
function App() {
  const handleSignIn = async () => {
    try {
      const result = await signIn({
        username: "dkkiuna11+2@gmail.com",
        password: "abcd1234",
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  const handleSignUp = async () => {
    try {
      const result = await signUp({
        username: "dkkiuna11+2@gmail.com",
        password: "abcd1234",
        options: {
          userAttributes: {
            phone_number: "+14695442049",
          },
        },
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCSignUp = async () => {
    try {
      const result = await confirmSignUp({
        confirmationCode: "096088",
        username: "dkkiuna11+2@gmail.com",
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const currentUser = async () => {
    try {
      const result = await getCurrentUser();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchMFA = async () => {
    console.log(Amplify.getConfig().Auth?.Cognito);
    try {
      const result = await fetchMFAPreference();
      // const result = await fetchDevices();
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div>
          <button onClick={handleSignIn}>Sign In</button>
        </div>
        <div>
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
        <div>
          <button onClick={handleCSignUp}>Confirm Sign Up</button>
        </div>
        <div>
          <button onClick={currentUser}>Current User</button>
        </div>
        <div>
          <button onClick={fetchMFA}>Fetch MFA</button>
        </div>
        <div>
          <button onClick={async () => await signOut()}>Sign Out</button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
