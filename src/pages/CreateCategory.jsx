import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateCategory() {

  const [name, setName] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const token = localStorage.getItem('access_token')
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}categories/`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      navigate('/categories')
    } catch (error) {
      setErrorMsg('Failed to create category')
    }
  }

  return (
    <div className="container mt-6">
      <div className="box">
        <h2 className="title is-4">Create New Category</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Category Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Category Name"
                required
              />
            </div>
          </div>

          {errorMsg && <p className="notification is-danger">{errorMsg}</p>}

          <div className="field">
            <div className="control">
              <button type="submit" className="button is-primary">Create</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCategory
