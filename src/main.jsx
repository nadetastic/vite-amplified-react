import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App'
import Test from './Test';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);


import { Amplify } from 'aws-amplify'
import config from './amplifyconfiguration.json'
Amplify.configure(config,{
  Storage: {
    S3: {
      prefixResolver: async ({ accessLevel, targetIdentityId}) => {
        if (accessLevel === 'guest') {
          return 'myPublicPrefix/';
        }
      }
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
