import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AudioProvider } from './Game/context/AudioPlayerContext.js'
import backgroundSound from './assets/sounds/themeOfPalletTown.mp3'

createRoot(document.getElementById('root')).render(
  <AudioProvider backgroundSound={backgroundSound}> 
    <StrictMode>
      <App />
    </StrictMode>
  </AudioProvider>
)
