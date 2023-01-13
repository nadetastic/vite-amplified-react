import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import { Storage } from 'aws-amplify'

function App() {

  const list = async () => {
    try {
      const result = await Storage.list('')
      console.log('result: ', result)
    } catch(err) {
      console.log('error: ', err)
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
      <h1>Amplify + Storage</h1>
      <div className="card">
        <button onClick={list}>List</button>
      </div>
    </div>
  )
}

export default App
