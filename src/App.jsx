import "./App.css";
import { useState } from "react";
import { uploadData } from "aws-amplify/storage";

function App() {
  const [file, setFile] = useState();

  const hanldeUpload = async () => {
    const filename = file.filename;

    try {
      const result = await uploadData({
        key: filename,
        data: file,
      }).result;
      console.log("Succeeded: ", result);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <div className="card">
      <input type="file" onChange={(event) => setFile(event.target.files[0])} />

      <button onClick={hanldeUpload}> Upload</button>
    </div>
  );
}

export default App;
