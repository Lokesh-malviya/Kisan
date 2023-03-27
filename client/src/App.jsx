import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import LoginPage from './component/Login/index.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div className="container">
      <LoginPage/>
      </div>
      
    </div>
  )
}

export default App
