import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClaimsProvider } from './context/ClaimsContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClaimsProvider>
      <App />
    </ClaimsProvider>
  </StrictMode>,
)
