import React from 'react'
import { useState, useEffect } from 'react'
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
          
            setCategories(response.data);
          } catch (err) {
            console.error("Failed to fetch categories", err);
          }
        })()  }, [])

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


        <div>
            <h2>Edit your Recording</h2>

           
          
        </div>
    )

  
}
    export default EditRecord
    