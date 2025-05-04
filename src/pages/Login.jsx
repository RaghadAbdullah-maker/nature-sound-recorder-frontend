import { useState } from 'react'
import { useNavigate } from 'react-router'
import { setTokens } from '../lib/api'
import axios from 'axios'


function Login() {


  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const [error, setError] = useState('')

  const navigate = useNavigate()



  const handleChange = (event) => {

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  
}



  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}token/`, formData)
      setTokens({
        access: response.data.access,
        refresh: response.data.refresh
      })
      navigate('/')

    } catch (err) {
      console.log(err)
      setError('Invalid username or password')
    }
  }


  return (
    <div>
      <h1>Login</h1>
      <h3>Hi Again 😊 </h3>


  
    </div>
  )
}

export default Login