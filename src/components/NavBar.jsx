import React from 'react'
import { Link, useNavigate } from 'react-router-dom'



function NavBar() {


    
    const navigate = useNavigate()


    const handleLogout = () => {
    
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        navigate('/login')

    }

    const isLoggedIn = Boolean(localStorage.getItem('access_token'))

    const generallinks = (
     <>
          <Link to="/login" className="icon"><span>Login</span></Link>{'   '}
          <Link to="/signup" className="icon"><span>Signup</span></Link>
     </>

    )



    const authlinks = (
        <>
           <Link to="/categories/" ><span>Categories</span></Link>{'       '}
            <Link to="/recordings" ><span>All Recording</span></Link>{'   '}
            <button onClick={handleLogout} className="logout-button"><span>Logout</span></button>
        </>
    )


    return (
            <nav className="navbar-container">
                    <div className="left-section">
                        <h3  className="logo" >𝖭𝖠𝖳𝕌𝖱𝖤</h3>
                    <div className="nav-links">
                    <Link to="/">Home</Link>
                        {isLoggedIn ? (
                        <>
                            <Link to="/categories/">Categories</Link>
                            <Link to="/recordings">All Recording</Link>
                        </>
                        ) : generallinks}
                    </div>
                    </div>

                    {isLoggedIn && (
                        <button onClick={handleLogout} className="logout-button">
                        <span>Logout</span>
                        </button>
                    )}
            </nav>
    )
}

export default NavBar

