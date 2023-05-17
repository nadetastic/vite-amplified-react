import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import { Auth } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

function App() {

  const [count, setCount] = useState(0)


  const currentUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      console.log(user)
    } catch (error) {
      console.log('error getting current user', error)
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
        <Authenticator>
          {({ signOut, user }) => (
            <div>
              <p>Hi {user.username}</p>
              <button onClick={signOut}>Sign out</button>
            </div>
          )}
        </Authenticator>

        <button onClick={currentUser}>Current User</button><br />

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

export default App;