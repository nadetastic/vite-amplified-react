import { useEffect } from "react";
import { get } from "aws-amplify/api";
import { Amplify } from "aws-amplify";
import "./App.css";
import { signInWithRedirect } from "aws-amplify/auth";

const existingConfig = Amplify.getConfig();
console.log("existing config", existingConfig);

const App = () => {
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const current = Amplify.getConfig();

    console.log("current", current);
    try {
      const restOperation = get({
        apiName: "MyApi",
        path: "",
      });
      const response = await restOperation.response;
      console.log("GET call succeeded: ", response);
    } catch (error) {
      console.log("GET call failed: ", error);
    }
  }

  return (
    <div className="App">
      <button onClick={fetchData}>Fetch Data</button>
      <button
        onClick={() =>
          signInWithRedirect({
            provider: {
              custom: "muscoAD",
            },
          })
        }
      >
        Sign In with Microsoft
      </button>
    </div>
  );
};

export default App;
