import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { generateClient } from "aws-amplify/api";
// import { signInWithRedirect } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";

import * as queries from "./graphql/queries";

const excon = Amplify.getConfig();

const client = generateClient();

console.log({ excon });

function App() {
  const apple = async () => {
    try {
      const result = await client.graphql({
        query: queries.listTodos,
        authMode: "iam",
      });

      console.log({ result });

      //signInWithRedirect({ provider: "Apple" });
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
        <button onClick={apple}>Apple</button>
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
