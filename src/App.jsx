import React from 'react'

import {BrowserRouter as Router, Routes, Route} from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Recordings from './pages/Recordings'
import Favorites from './pages/Favorites'
import NavBar from './components/NavBar'


function App() {
  return (
    
    <Router>
      
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/recordings/:id' element={<Recordings />} />
        <Route path='/Favorites' element={<Favorites />} />
        
      </Routes>
    </Router>


    

   

  )
}

export default App