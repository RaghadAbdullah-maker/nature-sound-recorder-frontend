import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function EditCategory() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    async function getCategory() {
      try {
        const token = localStorage.getItem('access_token')
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}categories/${id}/`,
          {
            headers: { Authorization: `Bearer ${token}` }
          })
        setName(response.data.name)
      } catch (error) {
        setErrorMsg('Error getting category')
      }
    }
    getCategory()
  }, [id])

  const handleUpdate = async (event) => {
    event.preventDefault()
    try {
      const token = localStorage.getItem('access_token')
      await axios.patch(
        `${import.meta.env.VITE_BASE_URL}categories/${id}/`,
        { name },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      navigate(`/categories/${id}`)
    } catch (error) {
      setErrorMsg('Error updating category')
    }
  }

  return (
    <div className="container mt-6">
      <div className="box">
        <h2 className="title is-4">Edit Category</h2>

        <form onSubmit={handleUpdate}>
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
              <button type="submit" className="button is-info">Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCategory
