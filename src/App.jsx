import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Storage } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
function App() {


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
        <Authenticator>
          {({signOut,user}) => (
            <>
            <h1>Hi {user.getUsername()}</h1>
            <Uploader />
            <button onClick={signOut}>Sign Out</button>
            </>
          )}
        </Authenticator>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App


const Uploader = () => {

  const [file,setFile] = useState()

  const uploadFileToStorage = async () => {
    try {

      console.log('uploading...')
      
 
      const config = {
        resumable: true,
        // level: 'private',
        contentType: 'text/plain',

        // progressCallback(progress) {
       
        //   console.log('event',progress);
        // },
      };
       const res = await Storage.put(file.path, file, config);
       console.log('done',res)
    } catch (err) {
      console.log('err', err);
    }
  };
  return ( <>
  
  <div>
    <input type='file' onChange={e => setFile(e.target.files[0])}/>
  </div>
  <div>
    <button onClick={uploadFileToStorage}>Upload</button>
  </div>
  <div>
    <button onClick={() => console.log('test')}>Test</button>
  </div>
  </> );
}