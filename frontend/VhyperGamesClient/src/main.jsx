import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.jsx'
import DocBotones from './components/placeHolders/DocBotones.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
    <DocBotones/>
  </StrictMode>,
)
