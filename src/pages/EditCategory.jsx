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
        setErrorMsg('Error getting categories')
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
      setErrorMsg('Error updatting categories')
    }
  }

  return (

    <div>
     
    </div>
  )
}

export default EditCategory

