import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Storage, Auth } from 'aws-amplify'

function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({})
  const [formcontent, setformContent] = useState('test')

  const signIn = async () => {
    try {
      const _user = await Auth.signIn(user.email, user.password)
      console.log(_user)
    } catch (error) {
      console.log('error signing in', error)
    }
  }

  const signUp = async () => {
    try {
      const _user = await Auth.signUp({
        username: user.email,
        password: user.password,
      })
      console.log(_user)
    } catch (error) {
      console.log('error signing up:', error)
    }
  }


  const confirm = async () => {
    try {
      const _user = await Auth.confirmSignUp(user.email, user.code)
      console.log(_user)
    } catch (error) {
      console.log('error confirming sign up', error)
    }
  }


  const uploadObject = async (key, content, level, type) => {
    const blob = new Blob([content], { type });
    // const {username} = await Auth.currentAuthenticatedUser();
    // console.log(username)
    //   return new Promise((res, rej) => {
    //       Storage.put(key, blob, {
    //           level: level,
    //           contentType: type,
    //           resumable: true,
    //           metadata: {
    //               username: 'anon'

    //           },
    //           completeCallback: (event) => {
    //               console.log('complete',event);
    //               res(event);
    //           },
    //           errorCallback: (err) => {
    //               console.error(err);
    //               rej(new Error('We could not complete that action. Please try again'));
    //           },
    //           progressCallback: (progress) => {
    //               console.log('....',progress);
    //           }
    //       });
    // });
    try {
      const res = await Storage.put(key, blob, {
        level: level,
        contentType: type,
        resumable: true,
        metadata: {
          username: 'anon'
        },
        progressCallback: (progress) => {
          console.log('....', progress);
        },
        completeCallback: (event) => {
          console.log('complete', event);
        },
        errorCallback: (err) => {
          console.error(err);
        }
      });
      console.log(res);
    } catch (error) {
      console.log('SOME ERROR', error);
    }
  };

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
        <input type="text" onChange={(e) => setUser({...user, email: e.target.value})} /><br />
        <input type="password" onChange={(e) => setUser({...user, password: e.target.value})} /><br />
        <button onClick={signIn}>Sign In</button><br />
        <button onClick={signUp}>Sign Up</button><br />
        <input type="text" onChange={(e) => setUser({...user, code: e.target.value})} /><br />
        <button onClick={confirm}>Confirm</button><br />
        {JSON.stringify(user,null,2)}
        <hr />
        <button onClick={ async () => console.log(await Auth.currentAuthenticatedUser())}>Current User</button><br />
        <input type="file" onChange={(e) => {console.log(e.target.files[0]);setformContent(e.target.files[0])}} /><br />
        <button onClick={() => uploadObject(formcontent.name, formcontent, 'public', formcontent.type)}>Upload</button><br />
        <hr />
        {/* <button onClick={() => uploadObject('test.txt', 'test', 'public', 'text/plain')}>Upload</button><br /> */}
        <button onClick={async () => await Auth.currentCredentials() }>Credentials</button><br />
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


/**
 * 
 * {
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Principal": {
				"Federated": "cognito-identity.amazonaws.com"
			},
			"Action": "sts:AssumeRoleWithWebIdentity",
			"Condition": {
				"StringEquals": {
					"cognito-identity.amazonaws.com:aud": "us-east-2:e563811f-4226-4166-b68c-1781d8b6b676"
				},
				"ForAnyValue:StringLike": {
					"cognito-identity.amazonaws.com:amr": "unauthenticated"
				}
			}
		}
	]
}
 */