import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App'
import './index.css'

import { Amplify } from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

import {
  Predictions,
  AmazonAIPredictionsProvider
} from '@aws-amplify/predictions';
Predictions.addPluggable(new AmazonAIPredictionsProvider());

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  }
]);




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
