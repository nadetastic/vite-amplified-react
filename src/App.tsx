import { useEffect } from "react";
import { get } from "aws-amplify/api";
import { Amplify } from "aws-amplify";
import "./App.css";
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
    </div>
  );
};

export default App;
