import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx';
import Taustatyyli from './Taustatyyli';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Taustatyyli />
    <App />
  </StrictMode>,
)
