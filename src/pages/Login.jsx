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
          console.log("Response:", response.data);
          
          setTokens({
            access: response.data.access,
            refresh: response.data.refresh
          })

          const accessToken = response.data.access
          const payload = JSON.parse(atob(accessToken.split('.')[1]))
          const userId = payload.user_id;
      
          localStorage.setItem('user_id', userId)
          console.log('Saved user_id:', userId)
      
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


      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  )
}

export default Login