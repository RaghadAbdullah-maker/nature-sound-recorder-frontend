import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import axios from 'axios'




function RecordingsDetails() {

 
    const { id } = useParams()
    const navigate = useNavigate()
    const [recording, setRecording] = useState([])
    const [errorMsg, setErrorMsg] = useState('')
    const [category, setCategory] = useState(null)


    async function getCategoryName(categoryId) {

      try {

        const token = localStorage.getItem('access_token')
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}categories/${categoryId}/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        console.log('Category Response:', response.data)
        setCategory(response.data.name)
      } catch (err) {
          console.log(err)
          setErrorMsg('Failed to fetch category')
      }
  }



    async function getSingleRecording() {

      try {
          const token = localStorage.getItem('access_token')
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}recordings/${id}/`, {
            headers: {
              'Authorization': `Bearer ${token}`  
            }
          })
          console.log(response)
          setRecording(response.data)
          console.log("Audio File:", response.data.audio_file)

        } catch (err) {
            console.log(err)
            if (err.status === 404) {
                console.log('Notfound')
            }else {
                setErrorMsg('Something went Wrong')
            }
        }
    }

    useEffect(() => {
        getSingleRecording()
        console.log(id)
        }, [id])

    useEffect(() => {
      
      if (recording.category) {
          getCategoryName(recording.category)
      }
      }, [recording])


   
  
    return ( 
        <>

          <div>
              <h2>{recording.title}</h2>
              <p>{recording.description}</p>
              <p>Category: {category}</p>
              <p>{new Date(recording.created_at) .toLocaleString('en-GB', {  
                     day: '2-digit',
                     month: '2-digit',
                     year: 'numeric',
                     hour: '2-digit',
                     minute: '2-digit'
                   })}</p>
              <audio controls src={`${import.meta.env.VITE_BASE_URL_back}${recording.audio_file}`}></audio>
        

          </div>
        </>
    )


  }
  


export default RecordingsDetails