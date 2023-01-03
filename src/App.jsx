import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { PubSub, Hub } from 'aws-amplify'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  Hub.listen('pubsub', (data) => {
    const { payload } = data;
    console.log(payload)
  });

const pubToTopic = async () => {
    // console.log('...',PubSub.configure())
    try {
        const res = await PubSub.publish('amplify4', { msg: 'Hello world! from CRA' }, { provider: 'AWSIoTProvider' });
        console.log('Message published',res);
    } catch (error) {
        console.log('Error publishing message', error);
    }
};

PubSub.subscribe('amplify3').subscribe({
    next: data => console.log('Message received', data),
    error: error => console.error(error),
    complete: () => console.log('Done'),
});


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
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button><br />
        <button onClick={pubToTopic}>Publish</button>
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
