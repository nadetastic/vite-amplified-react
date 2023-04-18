import { useState } from 'react'
import { FileManager } from './components/filemanager'
import './App.css'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <h1>Hi, {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
          <hr />
          <FileManager />
        </div>
      )}
    </Authenticator>
  )
}

export default App
