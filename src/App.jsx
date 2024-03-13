import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import * as queries from "./models/queries";
// import { Schema }

function App() {
  const client = generateClient();

  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const upload = async () => {
    try {
      const res = await client.graphql({
        query: queries.listTodos,
      });

      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const checkUser = async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Amplify</h1>
      <p>Hi, {user.username}</p>
      <div className="card">
        {/* <input type="file" onChange={(e) => upload(e.target.files)}/> */}
        <button onClick={upload}>upload</button>
        {/* <button onClick={checkUser}> Check User</button> */}
        {/* <button onClick={() => Auth.signOut()}>SignOut</button> */}
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
