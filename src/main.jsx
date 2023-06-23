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
// import config from './aws-exports'
Amplify.configure({
  Auth: {
    region: 'us-east-2',
    userPoolId: 'us-east-2_56YSHRA7O',
    identityPoolId: 'us-east-2:us-east-2:ae445e6b-d4dc-4b01-a7d2-7b4a43754451',
    userPoolWebClientId: '2bmetg3c8fheref1dsnein6qgt',

  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
