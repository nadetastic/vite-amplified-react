import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Auth } from 'aws-amplify'

function App() {
  const [count, setCount] = useState(0)

  const currentUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      console.log(user)
    } catch (error) {
      console.log(error)
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
        <button onClick={() => Auth.federatedSignIn({provider:'MyAzure'})}>Azure</button><br />
        <button onClick={currentUser}>Current User</button><br />
        <button onClick={() => Auth.signOut()}>Sign Out</button><br />
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
