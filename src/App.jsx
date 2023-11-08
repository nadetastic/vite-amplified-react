import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Storage } from 'aws-amplify'

Storage.configure({
  customPrefix: {
      public: 'myPublicPrefix/',
  },

})

function App() {

  const upload = async (files) => {

    console.log('uploading',files[0].name)
    try {
      const result = await Storage.put(files[0].name, files[0], {
        // resumable: true,
        // completeCallback: (event) => {
        //   console.log(`Successfully uploaded ${event.key}`);
        // },
        // progressCallback: (progress) => {
        //     console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        // },
        // errorCallback: (err) => {
        //     console.error('Unexpected error while uploading', err);
        // }
      })
      console.log(result)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Amplify</h1>
      <div className="card">
        <input type="file" onChange={(e) => upload(e.target.files)}/>
        <button onClick={upload}>upload</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
