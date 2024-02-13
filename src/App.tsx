import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { signUp } from "aws-amplify/auth";
function App() {
  const [count, setCount] = useState(0);

  const handleSignUp = async () => {
    try {
      const result = await signUp({
        password: "abcd1234",
        username: "dkkiuna11+4@gmail.com",
        // options: {
        //   userAttributes: {
        //     email: "dkkiuna11+2@gmail.com",
        //     given_name: "Given Name",
        //     family_name: "Family Name",
        //   },
        // },
      });
      console.log(result);

      return result;
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
        <button onClick={handleSignUp}>Sign Up</button>
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
