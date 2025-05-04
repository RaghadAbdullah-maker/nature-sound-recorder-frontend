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
         <Link to = "/login">Login</Link>{' '}
         <Link to = "/signup">Signup</Link>
     </>

    )


    const authlinks = (
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    )


    return (

        <>
            <nav>
                
                <Link to="/" >Home</Link>{' '}
                { isLoggedIn ? 
                authlinks
                :
                generallinks
                }




            </nav>
        
        
        
        
        </>
            
            





    )
}

export default NavBar