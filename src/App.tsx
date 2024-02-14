import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import FileUploader from "./components/FileUploader";
function App() {
  // const [count, setCount] = useState(0);

  return (
    <Authenticator>
      <FileUploader />
    </Authenticator>
  );
}

export default App;
