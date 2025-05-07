import React from 'react'

import {BrowserRouter as Router, Routes, Route} from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import RecordingsDetails from './pages/RecordingsDetails'
import Favorites from './pages/Favorites'
import NavBar from './components/NavBar'
import AddRecord from './pages/AddRecord'
import EditRecord from './pages/EditRecord'
import CategoryDetails from './pages/CategoryDetails'
import CategoriesList from './pages/CategoriesList'
import CreateCategory from './pages/CreateCategory'
import EditCategory from './pages/EditCategory'


function App() {
  return (
    
    <Router>
      
      <NavBar/>

      <Routes>


      <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/recordings/add' element={<AddRecord />} />
        <Route path='/recordings/:id/edit' element={<EditRecord />} />        
        <Route path='/recordings/:id' element={<RecordingsDetails />} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/categories/:id" element={<CategoryDetails />} />
        <Route path="/categories/create" element={<CreateCategory />} />
        <Route path="/categories/:id/edit" element={<EditCategory />} />
        <Route path='/Favorites' element={<Favorites />} />
        

      </Routes>
    </Router>


    

   

  )
}

export default App