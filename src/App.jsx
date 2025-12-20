import { useState } from 'react'
import { Game } from './Game/Game'
import "./index.css"
import './App.css'
import "./index.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <Game />
  )
}

export default App
