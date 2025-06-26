import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function RecordingsDetails() {

 
    const { id } = useParams()
    const navigate = useNavigate()
    const [recording, setRecording] = useState(null)
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
          if (recording && recording.category) {
              getCategoryName(recording.category)
          }
      }, [recording])
      
  async function deleteRecording() {
    const confirmDelete = window.confirm("Are you sure you want to delete this recording ?");
    if (!confirmDelete) return
    try {
      const token = localStorage.getItem('access_token')
  
      const response = await axios.delete( `${import.meta.env.VITE_BASE_URL}recordings/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
  
      if (response.status === 204) {
        navigate('/')
      }
    } catch (err) {
      console.error("Delete error", err);
      alert("You don't have permission to delete this recording")
    }
  }
  if (!recording) {
    return <p>Loading...</p>
}


const userId = localStorage.getItem('user_id')
return (
  <section className="recording-details-section">
    <div className="recording-box">
      <h2 className="recording-title">{recording.title}</h2>
      <p className="recording-description">{recording.description}</p>
      <p className="recording-category">Category: <span>{category}</span></p>
      <p className="recording-date">
        {new Date(recording.created_at).toLocaleString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>

      <div className="audio-player">
        <audio controls src={`${import.meta.env.VITE_BASE_URL_back}${recording.audio_file}`}></audio>
      </div>

      <div className="recording-buttons">
        {recording.user.toString() === userId && (
          <button className="delete-button" onClick={deleteRecording}>Delete</button>
        )}
        <Link className="edit-button" to={`/recordings/${id}/edit`}>
          Edit this Recording
        </Link>
      </div>
    </div>
  </section>
)

  }
  


export default RecordingsDetails