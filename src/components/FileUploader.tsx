import { uploadData } from "aws-amplify/storage";

function FileUploader() {
  const handleUpload = async (file: File) => {
    const filename = file.name;
    try {
      const result = await uploadData({
        key: filename,
        data: file,
        options: {
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              console.log(
                `Upload progress ${Math.round(
                  (transferredBytes / totalBytes) * 100
                )} %`
              );
            }
          },
        },
      }).result;
      console.log("Key from Response: ", result.key);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <div>
      <h3>Upload Your File</h3>
      <input type="file" onChange={(e) => handleUpload(e.target.files![0])} />
    </div>
  );
}

export default FileUploader;
