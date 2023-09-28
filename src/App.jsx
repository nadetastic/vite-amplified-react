import { useState } from 'react'
import './App.css'
import { Predictions } from 'aws-amplify'

import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

function App() {

  const [file,setFile] = useState(null)

  const idText = async () => {

try {
  const response = await Predictions.identify({
    text: {
      source: {
        file
      },
      format: "FORM", 
    }
  })
  console.log(response)
} catch(e){
  console.log(e)
}

  }

  return (
    <div className="App">

      <Authenticator>
        {({signOut,user}) => (
          <div>
            <h1>Hi, {user.username}</h1>
            <div>
              <input type='file' onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div>
              <button onClick={idText}>Identify</button>
            </div>
            <button onClick={signOut}>Sign Out</button>
          </div>
        )}
      </Authenticator>

    </div>
  )
}

export default App
