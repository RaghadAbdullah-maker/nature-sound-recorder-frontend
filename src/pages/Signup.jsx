import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { setTokens } from '../lib/api'

function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const response = await axios.post(
       `${import.meta.env.VITE_BASE_URL}signup/`,
        { username, email, password }
      )
      console.log(response.data)
      setTokens(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (

   <div className="login-page">
    <div className="backgraound">
      <div className="box" >
        <h1 className="title">Sign Up</h1>
        <h2 className="subtitle">To Nature Sound Recorder</h2>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          <div className="field is-grouped is-grouped-centered mt-4">
            <div className="control">
              <button className="button" type="submit">Sign Up</button>
            </div>
          </div>
        </form>
        </div>
        </div>
        </div>
    )
}

export default Signup
