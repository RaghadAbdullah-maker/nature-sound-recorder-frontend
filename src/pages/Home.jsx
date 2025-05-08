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
    <section className="section">
     <div className="container has-text-centered">

    <h1  className="title is-1 has-text-primary"> Welcome to Nature Sound Recorder 🎧🌿</h1>
    <h2 className=" " class =" subtitle is-4 mb-6 mt-5  has-text-weight-bold">All Recordings:</h2>

    { recordings.length === 0 ? (
        <p   className="has-text-grey" >No recordings found </p>
      ) : (
            <div className="columns is-multiline is-centered">
                {recordings.map(recording => {
                    return (

                        <div  className="column is-4" key={recording.id}>
                            <div className="card">
                            <div className="card-content">
                            <h3 className="title is-5 has-text-link">{recording.title}</h3>
                            <p className="subtitle is-6">{recording.description}</p>
                            <Link to={`recordings/${recording.id}`} className="button is-info is-light mt-3">View Details</Link>
                            </div>
                            </div>
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