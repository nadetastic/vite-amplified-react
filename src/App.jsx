import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Auth } from 'aws-amplify'
function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({})

  const signIn = async () => {
    try {
      const _user = await Auth.signIn(user.email, user.password)
      console.log(_user)
    } catch (error) {
      console.log('error signing in', error)
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
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button><br />

        <input type="text" placeholder="email" onChange={(e) => setUser({ ...user, email: e.target.value })} /><br />
        <input type="password" placeholder="password" onChange={(e) => setUser({ ...user, password: e.target.value })} /><br />
        <button onClick={signIn}>Sign In</button>
        <br />
        { JSON.stringify(user,null,2)}
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
