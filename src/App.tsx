import { useEffect } from "react";
import { get } from "aws-amplify/api";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  signInWithRedirect,
  fetchAuthSession,
  getCurrentUser,
} from "aws-amplify/auth";

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

  const handleSession = async () => {
    try {
      const result = await fetchAuthSession();
      console.log(result);
      const result2 = await getCurrentUser();
      console.log(result2);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Authenticator>
      <div className="App">
        <div>
          <button onClick={handleSession}>Session</button>
        </div>
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
    </Authenticator>
  );
};

export default App;
