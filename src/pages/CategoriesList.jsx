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
    <div className="page categories-page">
      <h2 className="title is-3 has-text-centered mb-5">CATEGORIES</h2>
  
      <div className="container box-container">
        {errorMsg && (
          <div className="notification is-danger is-light has-text-centered">
            {errorMsg}
          </div>
        )}
  
        <ul className="categories-list">
          {categories.map(category => (
            <li key={category.id} className="category-item">
              <Link className="category-link" to={`/categories/${category.id}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
  
        <div className="has-text-centered mt-5">
          <Link to="/categories/create">
            <button className="button2">Create New Category</button>
          </Link>
        </div>
      </div>
    </div>
  )
  
}

export default CategoriesList
