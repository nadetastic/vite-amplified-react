import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { uploadData, getUrl } from 'aws-amplify/storage'
import { signIn } from 'aws-amplify/auth'



function App() {

  const handleLogin = async () => {
    try {
      const res = await signIn({
        username: 'dkkiuna11@gmail.com',
        password: 'abcd1234'
      })
      console.log(res)
    } catch(e){
      console.log(e)
    }
  }

  const getfile = async () => {
    try {
      const res = await getUrl({
        key: 'v6-benji.jpg',
      });
      console.log(res)
    } catch(e){
      console.log(e)
    }
  }

  const upload = async (files) => {

    console.log('uploading',files[0].name)
    try {
      const result = await uploadData({
        key: 'v6-'+ files[0].name,
        data: files[0]
      }).result;
      console.log('Succeeded: ', result);
    } catch (error) {
      console.log('Error : ', error);
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
        <button onClick={handleLogin}>Login</button><br />
        <button onClick={getfile}>get</button>
        
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
