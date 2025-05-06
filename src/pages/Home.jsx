import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Home() {



    const [recordings, setRecordings] = useState([])

    async function getAllrecordings() {
      try {
        const token = localStorage.getItem('access_token')
        
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}recordings/`, {
          headers: {
            'Authorization': `Bearer ${token}`  
          }
        })
        console.log(response)
        setRecordings(response.data)
      } catch (error) {
        console.error('An error occurred. ', error)
        if (error.response && error.response.status === 401) {
          alert('Please log in again')
          window.location.href = "/login" 
        }
      }
    }

    useEffect(() => {
        getAllrecordings()
    }, [])


  return (
    <div>


  
    <h1> Welcome to Nature Sound Recorder 🎧🌿</h1>
    <h2>All Recordings:</h2>

    { recordings.length === 0 ? (
        <p>No recordings found </p>
      ) : (
            <div>
                {recordings.map(recording => {
                    return (

                        <div key={recording.id}>
                            <h3>{recording.title}</h3>
                            <p>{recording.description}</p>
                            <Link to={`recordings/${recording.id}`}>View Details</Link>
                        </div>
                    )
                })}
            </div>
)}
  
  
  </div> 
  

)
}

export default Home