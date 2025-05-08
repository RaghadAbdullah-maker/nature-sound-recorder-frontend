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
<section className="hero is-fullheight is-light">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="box" style={{ maxWidth: '400px', margin: 'auto' }}> 
                 <h1 className="title is-3 has-text-primary">Login</h1>
      <h3 className="subtitle is-5">Hi Again 😊 </h3>


      <form onSubmit={handleSubmit}>
      <div className="field 1">
      <div className="control 1">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
          </div>
          </div>
          <div className="field 2">
          <div className="control 2">
           <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
           </div>
           </div>
        <button  className="button is-primary is-fullwidth" type="submit" >Login</button>
      </form>
      </div>
        </div>
      </div>
    </section>
    
  )
}

export default Login