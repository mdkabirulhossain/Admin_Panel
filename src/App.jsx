
import { Route, Router, Routes } from 'react-router'
import './App.css'
import Dashboard from './Pages/Dashboard'

function App() {

  return (
    <div className='px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Routes>
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
