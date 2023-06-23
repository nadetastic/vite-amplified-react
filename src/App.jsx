import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { jsx, css, Global, ClassNames } from '@emotion/react'
import { Auth } from 'aws-amplify'

function App() {
  const [text, setText] = useState('')

  const current = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      setText(user.username)
      console.log(user)
    } catch (error) {
      console.log(error)
      setText(error)
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
        <button onClick={current}>Current User</button>
        <p>{ text }</p>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div css={{ color: 'hotpink' }}>HotPink
    <div
      css={css`
        color: green;
      `}
    >Green</div>
    <Global
      styles={{
        body: {
          margin: 0,
          padding: 0
        }
      }}
    />
    <ClassNames>
      {({ css, cx }) => (
        <div
          className={cx(
            'some-class',
            css`
              color: yellow;
            `
          )}
        >some-class yellow</div>
      )}
    </ClassNames>
  </div>
    </div>
  )
}

export default App
