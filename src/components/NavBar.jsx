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
         <Link to = "/login"  className="button is-link is-light">Login</Link>{'  '}
         <Link to = "/signup" className="button is-link is-light">Signup</Link>
     </>

    )



    const authlinks = (
        <>
            <Link className="button is-link is-light" to="categories/" >Categories</Link>{'  '}
            <button  className="button is-danger is-light"onClick={handleLogout}>Logout</button>
        </>
    )


    return (

        <>
            <nav  className="navbar is-primary">
            <div className="navbar-brand">
                <Link className="navbar-item has-text-white"to="/" >Home</Link>{'  '}
                </div>

                <div className="navbar-menu is-active">
                <div className="navbar-end has-text-centered is-fullwidth">               
                { isLoggedIn ? 
                authlinks
                :
                generallinks
                }
                             
                             </div>
                             </div>


            </nav>
        
        
        
        
        </>
            
            





    )
}

export default NavBar