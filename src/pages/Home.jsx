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
    <section className="hero is-fullheight is-light">
     <div className="container has-text-centered">

    <h1  className="title is-1 has-text-primary"> Welcome to Nature Sound Recorder 🎧🌿</h1>
    <h2 class="subtitle is-2" >All Recordings:</h2>

    { recordings.length === 0 ? (
        <p>No recordings found </p>
      ) : (
            <div>
                {recordings.map(recording => {
                    return (

                        <div key={recording.id}>
                            <h3 class="subtitle is-3">{recording.title}</h3>
                            <p class="subtitle is-5">{recording.description}</p>
                            <Link to={`recordings/${recording.id}`}>View Details</Link>
                        </div>
                    )
                })}
            </div>
)}
  
  
  </div> 
  </section>
   

)
}

export default Home