import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App'
import Test from './Test';
import './index.css'
import { Amplify } from 'aws-amplify';
import config from '../amplifyconfiguration.json';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'

Amplify.configure(config);

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Authenticator.Provider> */}
      <Authenticator>
        <RouterProvider router={router} />
      </Authenticator>
    {/* </Authenticator.Provider> */}
  </React.StrictMode>,
)
