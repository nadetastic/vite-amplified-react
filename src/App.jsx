import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Auth } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';

Auth.configure({
  authenticationFlowType: 'CUSTOM_AUTH',
})

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({})
  const [cognitoUser, setCognitoUser] = useState(null)

  const signUp = async () => {
    try {
      const _user = await Auth.signUp({username: user.email, password: user.password,
        attributes: {
          phone_number: user.phone_number,
        }
      })
      console.log('user:', _user);
      // setCognitoUser(_user.user)
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  const setMFA = async () => {
    console.log('cog usr', cognitoUser)
    try {
      const res = await Auth.setPreferredMFA(cognitoUser, 'SMS_MFA')
      console.log('res:', res);
    } catch (error) {
      console.log('error setting MFA:', error);
    }
  }

  const confirmSignUp = async () => {
    console.log('cog usr', cognitoUser)
    try {
      const _user = await Auth.confirmSignUp(user.email, user.code)
      console.log('user:', _user);
    } catch (error) {
      console.log('error confirming sign up:', error);
    }
  }

  const signIn = async () => {
    try {
      const _user = await Auth.signIn(user.email, user.password)
      console.log('user:', _user);
      setCognitoUser(_user)
    } catch (error) {
      console.log('error signing in:', error);
    }
  }

  const confirmSignIn = async () => {
    try {
      const _user = await Auth.confirmSignIn(cognitoUser, user.mfacode)
      console.log('user:', _user);
    } catch (error) {
      console.log('error confirming sign in:', error);
    }
  }

  const sendCustomChallengeAnswer = async () => {
    try {
      const _user = await Auth.sendCustomChallengeAnswer(cognitoUser, user.otp)
      console.log('user:', _user);
    } catch (error) {
      console.log('error confirming sign in:', error);
    }
  }

  const currentUser = async () => {
    try {
      const _user = await Auth.currentAuthenticatedUser()
      console.log('user:', _user);
    } catch (error) {
      console.log('error getting current user:', error);
    }
  }

  const signOut = async () => {
    try {
      await Auth.signOut()
    } catch (error) {
      console.log('error signing out: ', error);
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
        <h3>Sign Up</h3>
        <input type="text" placeholder="email" onChange={(e) => setUser({...user, email: e.target.value})} /><br />
        <input type="password" placeholder="password" onChange={(e) => setUser({...user, password: e.target.value})} /><br />
        <input type="text" placeholder="phone_number" onChange={(e) => setUser({...user, phone_number: e.target.value})} /><br />
        <button onClick={signUp}>Sign Up</button>
      </div>

      {/* <div className="card">

        <button onClick={setMFA}>Set MFA</button>
      </div> */}

      <div className="card">
        <h3>Confirm Sign Up</h3>
        <input type="text" placeholder="email" onChange={(e) => setUser({...user, email: e.target.value})} /><br />
        <input type="text" placeholder="code" onChange={(e) => setUser({...user, code: e.target.value})} /><br />
        <button onClick={confirmSignUp}>Confirm Sign Up</button>

      </div>
      <div className="card">
        <h3>Sign In</h3>
        <input type="text" placeholder="email" onChange={(e) => setUser({...user, email: e.target.value})} /><br />
        <input type="password" placeholder="password" onChange={(e) => setUser({...user, password: e.target.value})} /><br />
        <button onClick={signIn}>Sign In</button>
      </div>

      <div className="card">
        <h3>Confirm Sign In</h3>
        <input type="text" placeholder="mfacode" onChange={(e) => setUser({...user, mfacode: e.target.value})} /><br />
        <button onClick={confirmSignIn}>Confirm Sign In</button>
      </div>

      <div className="card">
        <h3>Send Custom Challenge Answer</h3>
        <input type="text" placeholder="otp" onChange={(e) => setUser({...user, otp: e.target.value})} /><br />
        <button onClick={sendCustomChallengeAnswer}>Send Custom Challenge Answer</button>
      </div>

      <div className="card">
        <button onClick={currentUser}>Current User</button>
      </div>

      <div className="card">
        <button onClick={signOut}>Sign Out</button>
      </div>
      

      <hr />
      <Authenticator>
        {({ signOut, user }) => (
          <div>
            <h1>Hi, { user.username} </h1>
            <button onClick={signOut}>Sign out</button>
          </div>
        )}
      </Authenticator>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
