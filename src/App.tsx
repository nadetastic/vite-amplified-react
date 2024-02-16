// import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { signIn, signOut, confirmSignIn } from "aws-amplify/auth";
function App() {
  const handleSignIn = async () => {
    try {
      const result = await signIn({
        username: "dkkiuna11+admincreate2@gmail.com",
        password: "Kk4vFeiO",
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const handleConfirmSignIn = async () => {
    try {
      const result = await confirmSignIn({
        challengeResponse: "abcd1234",
      });
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Authenticator>
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
        <button onClick={handleSignIn}>Sign In</button>
        <div>
          <button onClick={async () => await signOut()}>Sign Out</button>
        </div>
        <div>
          <button onClick={handleConfirmSignIn}>Confirm Sign In</button>
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </Authenticator>
  );
}

export default App;
