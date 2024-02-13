import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
// import { generateClient } from "aws-amplify/api";
import { Storage } from "aws-amplify";
// import * as queries from "./graphql/queries";
// export const client = generateClient();
function App() {
  // const [file, setFile] = useState();

  const fileUpload = async (file) => {
    await Storage.put(`path`, file, {
      progressCallback(progress) {
        console.log(`progress uploaded: ${progress.loaded}/${progress.total}`);
      },
    })
      .then((result) => {
        // handling the result
        console.log("result: ", result);
      })
      .catch((err) => {
        // handling the error
        console.error("error: ", err);
      });
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
      <Authenticator>
        {({ signOut, user }) => (
          <div className="card">
            {user?.username}
            <input
              type="file"
              onChange={(e) => fileUpload(e.target.files[0])}
            />
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
            <button onClick={signOut}>Sign Out</button>
          </div>
        )}
      </Authenticator>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
