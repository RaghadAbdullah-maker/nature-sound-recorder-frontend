import React from 'react'
import axios from 'axios'
import { Link ,useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function ListRecording() {

  const navigate = useNavigate()


  const nav = () => {
    
    navigate('/recordings/add')

}
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

<section className="section recordings-section">
  <div className="container has-text-centered">

    <h1 className="title is-1 has-text-primary mb-5">Recordings</h1>

    <button onClick={nav} className="button2">
      <span>Add New Record</span>
    </button>

    {recordings.length === 0 ? (
      <p className="has-text-grey">No recordings found</p>
    ) : (
      <div className="columns is-multiline is-centered">
        {recordings.map(recording => (
          <div className="column is-4" key={recording.id}>
            <div className="card recording-card">
              <div className="card-content">
                <h3 className="title is-5 has-text-link">{recording.title}</h3>
                <p className="subtitle is-6">{recording.description}</p>
                <Link to={`/recordings/${recording.id}`} className="button is-info is-light mt-3">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

  </div>
</section>


  )
}

export default ListRecording