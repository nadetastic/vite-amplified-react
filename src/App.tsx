import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Storage, Auth } from "aws-amplify";
function App() {
  const [userForm, setUserForm] = useState<any>({});

  const fileUpload = async (file: any) => {
    //}, progressSetter: any) => {
    await Storage.put(`path`, file, {
      progressCallback(progress) {
        console.log(`uploaded: ${progress.loaded}/${progress.total}`);
        // progressSetter(Math.round((progress.loaded / progress.total) * 100));
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

  const login = async () => {
    try {
      const result = await Auth.signIn(userForm.username, userForm.password);
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
        <input
          onChange={(e) =>
            setUserForm({ ...userForm, username: e.target.value })
          }
        />
        <input
          onChange={(e) =>
            setUserForm({ ...userForm, password: e.target.value })
          }
        />
        <button onClick={login}>Login</button>
        <br />{" "}
        <input
          type="file"
          // accept=".mp4, .m4v, .mov"
          onChange={(e) => {
            fileUpload(e.target.files![0]);
          }}
        />
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
