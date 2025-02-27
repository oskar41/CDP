import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRoutes from './routes/Routes'
import Navigation from './components/navigation'
import Sidebar from './components/navigation'

function App() {

  return (
    <div className="App">
      <Sidebar />
      <AppRoutes />
    </div>
  )
}

export default App
