import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function CategoryDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [category, setCategory] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    async function getCategory() {
      try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}categories/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setCategory(response.data)
      } catch (error) {
        setErrorMsg(error.response?.data?.detail || 'Failed to fetch category')
      }
    }
    getCategory()
  }, [id])
  
  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?')
    if (!confirmDelete) return
    try {
      const token = localStorage.getItem('access_token')
      await axios.delete(`${import.meta.env.VITE_BASE_URL}categories/${id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      navigate('/categories')
    } catch (error) {
      alert('Failed to delete category')
    }
  }

  return (
    <div className="container mt-6">
      {category === null ? (
        <p className="has-text-grey">Loading category...</p>
      ) : (
        <>
          <div className="box">
            <h2 className="title is-4">{category.name}</h2>
            <p className="has-text-grey-dark mb-4">
              {new Date(category.created_at).toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <div className="buttons">
              <Link to={`/categories/${id}/edit`}>
                <button className="button is-info">Edit Category</button>
              </Link>
              <button onClick={handleDelete} className="button is-danger">
                Delete Category
              </button>
            </div>
          </div>
        </>
      )}
      {errorMsg && <p className="notification is-danger mt-4">{errorMsg}</p>}
    </div>
  )
}

export default CategoryDetails
