import { Auth0Provider } from '@auth0/auth0-react'

const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI
const audience = import.meta.env.VITE_AUTH0_AUDIENCE
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './styles/output.css'
import 'regenerator-runtime'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        useRefreshTokens={true}
        cacheLocation='localstorage'
        authorizationParams={{
            redirect_uri: redirectUri,
            audience: audience,
        }}>
        <Provider store={store}>
            <App />
        </Provider>
    </Auth0Provider>,
)
