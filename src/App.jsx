import { useEffect } from 'react'
import { Auth } from 'aws-amplify'
import './App.css'
import jwt from "jwt-decode";

function App() {

  const currentUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      console.log(user)
    } catch (error) {
      console.log('error getting current user', error)
    }
  }

  const currentSession = async () => {
    try {
      const session = await Auth.currentSession()
      console.log(session)
    } catch (error) {
      console.log('error getting current session', error)
    }
  }

  return (
    <div className="App">
      <h1>Amplify</h1>
      <div className="card">

        <FederatedThroughCognito />
        <SignInWithGoogle />

        <br />
        
        <button onClick={currentUser}>Current User</button><br />
        <button onClick={currentSession}>Current Session</button><br />
      
        <button onClick={() => Auth.signOut()}>Sign Out</button>

      </div>
    </div>
  )
}

export default App

const FederatedThroughCognito = () => {

  // This component renders a button that calls Auth.federatedSignIn to initiate the Cognito hosted UI flow, where the flow is as follows:
  // 1. Client calls Auth.federatedSignIn which opens the Cognito Hosted UI
  // 2. User federates with a social provider (Google)
  // 3. Google responds back to Cognito with a Google credential, these are not exposed to the client
  // 4. Cognito responds back to the client with AWS credentials
  //
  // Client => Cognito => Google => Cognito => Client 
  //

  const google = async () => {
    try {
      await Auth.federatedSignIn({ provider: 'Google' })
    } catch (error) {
      console.log('error signing in', error)
    }
  }
  return (
    <button onClick={google}>Federate via Cognito</button>
  )
}


const SignInWithGoogle = () => {

  // This component renders the Google sign-in button where the flow is as follows:
  // 1. User clicks on the Google button
  // 2. Google button calls Google API to get a Google credential
  // 3. Client recieve the Google credential and then uses Auth.federatedSignIn to exchange the Google credential for AWS credentials
  //
  // Client => Google => Client => Cognito => Client
  //

  useEffect(() => {
    // Check for an existing Google client initialization
    if (!window.google && !window.google?.accounts) createScript();
  }, []);

  // Load the Google client
  const createScript = () => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initGsi;
    document.body.appendChild(script);
  };

  // Initialize Google client and render Google button
  const initGsi = () => {
    if (window.google && window.google?.accounts) {
      window.google.accounts.id.initialize({
        client_id: "541264766868-vei0r49i7oq6f9qdoh4kmv8vca3i00p7.apps.googleusercontent.com",
        callback: (response) => {
          getAWSCredentials(response.credential);
        },
      });
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        { theme: "outline", size: "large" }
      );
    }
  };

  // Exchange Google token for temporary AWS credentials
  const getAWSCredentials = async (credential) => {
    const token = jwt(credential);
    const user = {
      email: token.email,
      name: token.name,
    };
    await Auth.federatedSignIn(
      "google",
      { token: credential, expires_at: token.exp },
      user
    )
      .then((cred) => {
        // If success, you will get the AWS credentials
        console.log({ cred });
        return Auth.currentAuthenticatedUser();
      })
      .then((user) => {
        // If success, the user object you passed in Auth.federatedSignIn
        console.log({ user });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <button id="googleSignInButton" />
    </div>
  );
};
