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


    <div>
      <h2> Create New Category </h2>
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Category Name"
        />

        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateCategory
