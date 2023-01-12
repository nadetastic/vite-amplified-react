import { useState, useEffect } from "react";
import './App.css';
import { Auth } from 'aws-amplify'
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

const formStateEnum = {
    signUp: 'signUp',
    confirmSignUp: 'confirmSignUp',
    signIn: 'signIn',
    loggedIn: 'loggedIn',
    verifySignUp: 'verifySignUp'
  };

const initialCreds = { username:'',password:'',code:'',formState: formStateEnum.signIn, error: ''}

const Home = () => {
    const [creds, set_creds] = useState(initialCreds)
    const [notification, set_notification] = useState('')

    useEffect(() => {
        const checkUser = async () => {
            try {
                await Auth.currentAuthenticatedUser()
                set_creds({...creds,formState: formStateEnum.loggedIn})
            } catch(e){
                set_creds({...creds,formState: formStateEnum.signIn})
            }
        }
        checkUser()
    },[])

    const signUp = async () => {
        try {
            const res = await Auth.signUp({
              username: creds.username,
              password: creds.password,
              autoSignIn: { // optional - enables auto sign in after user is confirmed
                enabled: true,
            }
            })
            console.log('sign up:',res)
            set_creds({...creds,formState:formStateEnum.confirmSignUp})
        } catch(e){
            console.error(e)
            set_notification(JSON.stringify(e))
        }
    }

    const confirmSignUp = async () => {
        try {
            const res = await Auth.confirmSignUp(creds.username,creds.code)
            console.log(res)
            set_creds({...creds,formState:formStateEnum.signIn})
        } catch(e){
            console.error(e)
        }
    }

    const signIn = async () => {
        try {
            const res = await Auth.signIn(creds.username,creds.password)
            console.log(res)
            set_creds({...creds,formState:formStateEnum.loggedIn})
        } catch(e){
            console.error(e)
            set_notification(JSON.stringify(e))
        }
    }

    const currentUser = async () => {
        try {
            const res = await Auth.currentAuthenticatedUser()
            console.log(res)
        } catch(e){
            console.error(e)
        }
    }

    const federate = async (provider) => {
        try {
            const res = await Auth.federatedSignIn({provider: provider})
            console.log(res)
        } catch(e){
            console.error(e)
        }
    }

    const resendVerificationCode = async (provider) => {
        try {
            const res = await Auth.resendSignUp(creds.username)
            console.log(res)
            set_creds({...creds,formState:formStateEnum.confirmSignUp})
        } catch(e){
            console.error(e)
        }
    }

    return ( 
        <div className="App">
            <h1>Amplify + Vite</h1>
            <p><code>{JSON.stringify(creds)}</code></p>
            <p style={{ background: '#ffdfdf', color: 'red'}}>{notification}</p>

            <button onClick={async () => {
                try {
                  const res = await Auth.currentAuthenticatedUser();
                  console.log(res)
                } catch(e){
                  console.error(e)
                }
            }}>Check for user</button>
            { creds.formState === formStateEnum.signUp && (
                <div className="card">
                    <h2>Sign Up</h2>
                    <input type="text" placeholder="Username" onChange={e => set_creds({...creds, username: e.target.value})} /><br />
                    <input type="text" placeholder="Password" onChange={e => set_creds({...creds, password: e.target.value})} /><br />
                    <button onClick={signUp}>Sign Up</button><br/>
                    <a onClick={() => set_creds({...creds,formState:formStateEnum.signIn})}>Sign In</a><br />
                    <a onClick={() => set_creds({...creds,formState:formStateEnum.resendSignUp})}>Resend SignUp Code</a>
                </div>
            )}


            { creds.formState === formStateEnum.confirmSignUp && (
                <div className="card">
                    <input type="text" placeholder="Code" onChange={e => set_creds({...creds, code: e.target.value })} /><br />
                    <button onClick={confirmSignUp}>Confirm SignUp</button>
                </div>
            )}

            { creds.formState === formStateEnum.resendSignUp && (
                <div className="card">
                    <input type="text" placeholder="Username" onChange={e => set_creds({...creds,username: e.target.value })} /><br />
                    <button onClick={resendVerificationCode}>Resend SignUp Code</button>
                </div>
            )}

            { creds.formState === formStateEnum.signIn && (
                <div className="card">
                    <h2>Sign In</h2>
                    <input type="text" placeholder="Username" onChange={e => set_creds({...creds, username: e.target.value})} /><br />
                    <input type="text" placeholder="Password" onChange={e => set_creds({...creds, password: e.target.value})} /><br />

                    <button onClick={signIn}>Sign In</button><br />
                    <a onClick={() => set_creds({...creds,formState:formStateEnum.signUp})}>Sign Up</a>
                    <hr />
                    <h3>Social Sign In</h3>
                    <button onClick={() => federate('Google')}>Google</button>
                </div>
            )}
            { creds.formState === formStateEnum.loggedIn && (
                <>
                    <div className="card">
                        <button onClick={currentUser}>Current User</button>
                    </div>
                    <div className="card">
                        <button onClick={() => Auth.signOut()}>Sign Out</button>
                    </div>
                </>
            )}
            
            
        </div>
    );
}
 



const HomeWithUI = () => {

  const services = {
    async handleSignUp(formData) {
        try {
            return Auth.signUp({
                username,
                password,
                attributes,
                autoSignIn: {
                  enabled: true,
                },
              })
        } catch (e) {
            console.log(e)
            return 'custom error'
            // throw new Error('My custom error')
        }
    },
  };

  return (
    <Authenticator 
    services={services}
    signUpAttributes={['email','gender','name']}>
      {({signOut,user}) => (
        <div>
          <h1>Hello from Authenticator | {user.username} </h1>
          <button onClick={signOut}>Sign Out</button>
      </div>
      )}
      
    </Authenticator>
  );

}

export default HomeWithUI;