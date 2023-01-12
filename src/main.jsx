import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { Amplify } from 'aws-amplify'
import config from '../src/aws-exports'

Amplify.configure(config)
Amplify.Logger.LOG_LEVEL = 'DEBUG'

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />,
)
