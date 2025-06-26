import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import DestinationsSlider from '../components/DestinationsSlider'
function Home() {




  return (
    <>
    

    <div className="home-background">
      <div className="home">  
         
          <h1 >NATURE SOUND RECORDER</h1>             

      </div>  
  <DestinationsSlider/></div> 
</>
     

)
}

export default Home