import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Amplify } from 'aws-amplify'
import { AWSIoTProvider } from '@aws-amplify/pubsub'
import config from './aws-exports'

global.WebSocket = WebSocket

Amplify.Logger.LOG_LEVEL = 'DEBUG'

Amplify.configure(config)

Amplify.addPluggable(new AWSIoTProvider({
  aws_pubsub_region: 'us-east-1',
  aws_pubsub_endpoint:
    'wss://ajoorzya8zk5s-ats.iot.us-east-1.amazonaws.com/mqtt'
}))

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />,
)
