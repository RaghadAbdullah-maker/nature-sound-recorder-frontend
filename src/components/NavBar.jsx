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


    return (

        <>
            
        
        
        
        
        </>
            
            





    )
}

export default NavBar