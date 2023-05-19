import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Auth } from 'aws-amplify'

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState('')

  const currentUser = async () => {
    try {
      const _user = await Auth.currentAuthenticatedUser({bypassCache:true})
      console.log(_user)
    } catch (error) {
      console.log(error)
    }
  }

  const updateEmail = async () => {
    try {
      const _user = await Auth.currentAuthenticatedUser()
      const _res1 = await Auth.updateUserAttributes(_user, {
        email: 'dkkiuna11+new2@gmail.com',
      })
      console.log(_res1)
    } catch (error) {
      console.log(error)
    }
  }

  const confirmEmailUpdate = async () => {
    try {
      const _res2 = await Auth.verifyCurrentUserAttributeSubmit('email',code)
      console.log(_res2)
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
      <Authenticator>
        {({ signOut,user }) => (
          <div>
            <h2>Hello {user.username}</h2><br />
            <button onClick={currentUser}>Current User</button><br />
            <button onClick={updateEmail}>Update Email</button><br />
            <input type="text" onChange={(e)=>setCode(e.target.value)} /><br />
            <button onClick={confirmEmailUpdate}>Confirm Email</button><br />
            <button onClick={signOut}>Sign out</button>
          </div>
        )}
      </Authenticator>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
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
