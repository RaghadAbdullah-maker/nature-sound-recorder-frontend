
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function CategoriesList() {


  const [categories, setCategories] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}categories/`);
        setCategories(response.data)
      } catch (error) {
        setErrorMsg('Failed to fetch categories')
      }
    }
    getCategories()
  }, [])



  return (



    <div>
      <h2>Categories</h2>

    
    </div>
  )
}

export default CategoriesList
