import { useState } from 'react'
import './App.css'
import Hero from './components/custom/Hero'
import Features from './components/custom/sections/Features'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Hero/>
     <Features/>
    </>
  )
}

export default App
