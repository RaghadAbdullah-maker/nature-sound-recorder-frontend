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
    <div className="container mt-6">
      <h2 className="title is-4">Categories</h2>

      {errorMsg && (
        <div className="notification is-danger is-light">{errorMsg}</div>
      )}

      <ul className="menu-list box">
        {categories.map(category => (
          <li key={category.id}>
            <Link className="has-text-link" to={`/categories/${category.id}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>

      <Link to="/categories/create">
        <button className="button is-primary mt-4">Create New Category</button>
      </Link>
    </div>
  )
}

export default CategoriesList
