// import { useState } from 'react'
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { signIn, signOut } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
// import { fetchAuthSession, signIn } from 'aws-amplify/auth'

import * as q from "./graphql/queries";

import { Authenticator } from "@aws-amplify/ui-react";

// const client = generateClient()
import "@aws-amplify/ui-react/styles.css";
function App() {
  const test = async () => {
    try {
      const user = await signIn({
        username: "dkkiuna11@gmail.com",
        password: "abcd1234",
      });
      // await signIn({
      //   username: 'dkkiuna11@gmail.com',
      //   password: 'abcd1234'
      // })

      console.log(user);
      // console.log(`${JSON.stringify((await fetchAuthSession()).tokens?.accessToken)}`)
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
        <button onClick={test}>Sign In</button>
        <br />
        <button onClick={async () => await signOut()}>Sign Out</button>
        {/* <Authenticator /> */}
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
