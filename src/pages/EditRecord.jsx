import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios'
import { authorizedRequest } from '../lib/api'

function EditRecord() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [audiofile, setAudiofile] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}categories/`)
        setCategories(response.data)
      } catch (err) {
        console.error("Failed to fetch categories", err)
      }
    })()
  }, [])

  async function getCurrentRecording() {
    try {
      const token = localStorage.getItem('access_token')
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}recordings/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setTitle(response.data.title)
      setDescription(response.data.description)
      setSelectedCategory(response.data.category)
    } catch (err) {
      console.error('Failed to load recording:', err)
    }
  }

  useEffect(() => {
    getCurrentRecording()
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('category', selectedCategory)
    if (audiofile) {
      formData.append('audio_file', audiofile)
    }

    try {
      const token = localStorage.getItem('access_token')
      await axios.patch(`${import.meta.env.VITE_BASE_URL}recordings/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      navigate(`/recordings/${id}`)
    } catch (err) {
      console.error('Update failed:', err)
    }
  }

  return (
    <div className="container mt-6 edit-recording-container">
    <div className="box edit-recording-box">
      <h2 className="title is-3 has-text-centered has-text-link mb-5">Edit Your Recording</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="field">
            <label className="label">Title:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Description:</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="description"
                placeholder="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Category:</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
                  <option value="">Select a Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">Audio File:</label>
            <div className="control">
              <input
                className="input"
                type="file"
                accept="audio/*"
                onChange={(event) => setAudiofile(event.target.files[0])}
                required
              />
            </div>
          </div>

          <div className="field">
            <div className="control">
              <button type="submit" className="button3">Edit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditRecord
