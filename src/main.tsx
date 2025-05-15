import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react';

const domain= 'dev-v3quh1lk1k3s0y4q.us.auth0.com'
const clientId = 'yJg9sgG6FgwUcqnAhOOgkZJLbHg1FRpH'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
      domain = {domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>,
)
