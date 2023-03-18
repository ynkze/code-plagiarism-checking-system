import React from 'react'
import { AuthProvider } from 'react-auth-kit'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import App from './App'
import './index.css'

const engine = new Styletron();


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <AuthProvider
      authType={'cookie'}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      cookieSecure={false}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </StyletronProvider>
  </React.StrictMode>
)
