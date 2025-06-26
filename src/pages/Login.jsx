import React from 'react'
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
      <div className="login-page">
        <div className="backgraound">

       
                  <div className='box'> 
                    <h1>Welcome </h1>
                   <h2 >Login</h2>
                  <form onSubmit={handleSubmit}>
                                <div className="field-1">
                                <label className="field-11">User Name </label>
                                  <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                  />
                                    </div>
                                    
                                  <div className="field-2">
                                  <label className="field-22" >Password</label>                                    <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                  />
                                    </div>
                                  <button  className="button" type="submit" >Login</button>
                    </form>
                   </div>
               
      </div>
        </div>
    
  )
}

export default Login