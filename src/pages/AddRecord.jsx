import React from 'react'
import { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authorizedRequest } from '../lib/api'

function AddRecord() {
  const navigate = useNavigate()

  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [audioFile,setAudiofile] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [error,setErorr] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}categories/`)
        setCategories(response.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    })()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const userId = localStorage.getItem('user_id')
    if (!userId) {
      setErorr('no user id')
      return
    }

    const formData = new FormData()
    formData.append('title',title)
    formData.append('description',description)
    formData.append('audio_file',audioFile)
    formData.append('category', selectedCategory)
    formData.append('user', userId)

    try {
      const response = await authorizedRequest("POST", "recordings/", formData)
      if (response && response.data) {
        console.log("Recording Uploaded", response.data)
        alert("Recording Uploaded Successfully")
        navigate('/')
      } else {
        console.error("No data received", response)
        setErorr("An error occurred, please try again.")
      }
    } catch (error) {
      console.log(error)
      setErorr('An error occurred.')
    }
  }

  return (
    <div className="container mt-6">
      <h1 className="title has-text-centered">Add Record</h1>

      {error && (
        <div className="notification is-danger is-light">{error}</div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <label className="label">
          Title:
          <input 
            className="input"
            type="text" 
            name="title"
            placeholder="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </label>
        <hr />

        <label className="label">
          Description:       
          <input   
            className="input"
            type="text" 
            name="description"
            placeholder="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </label>
        <hr />

        <label className="label">
          Category: 
          <div className="select is-fullwidth">
            <select 
              value={selectedCategory} 
              onChange={(event) => setSelectedCategory(event.target.value)}
              required
            >
              <option value="">Select a Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </label>

        <label className="label">
          Audio File: 
          <div className="file has-name is-fullwidth mt-2">
            <label className="file-label">
              <input 
                className="file-input"
                type="file" 
                accept='audio/*'             
                onChange={(event) => setAudiofile(event.target.files[0])}
                required
              />
              <span className="file-cta">
                <span className="file-label">Choose a file…</span>
              </span>
              <span className="file-name">
                {audioFile ? audioFile.name : "No file selected"}
              </span>
            </label>
          </div>
        </label>
        <hr />

        <button type="submit" className="button is-primary is-fullwidth mt-4">
          Upload
        </button>

      </form>
    </div>
  )
}

export default AddRecord
