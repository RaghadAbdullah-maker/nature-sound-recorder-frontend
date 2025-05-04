
// ibrary we use to send requests to the backend
import axios from "axios"   

const baseUrl = import.meta.env.VITE_BASE_URL


//save tokens inside localstorge
function setTokens({ access, refresh }) {

    if (access)   localStorage.setItem('access_token', access)
    if (refresh) localStorage.setItem('refresh_token', refresh)} 



 // refresh token    
async function refreshAccessToken() {

    const refreshToken = localStorage.getItem('refresh_token')
    if (refreshToken) {
        const response = await axios.post(
            `${baseUrl}/token/refresh/`,
            { refresh: refreshToken }
        )
        setTokens({ access: response.data.access })
        console.log('access token has been refreshed')
    }
}



async function authorizedRequest(method, url, data = null) {
 
    const config = {
        method,
        url: `${baseUrl}${url}`,
        headers: {}
    }

    if (data)  config.data = data
    

    let accessToken = localStorage.getItem('access_token')
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    try {
        const response = await axios(config)
        return response
    } catch (err) {
        console.log(err)
        //401 : unauthorized
        if (err.response && err.response.status == 401) {
            try {
                accessToken = await refreshAccessToken()
                config.headers['Authorization'] = `Bearer ${accessToken}`

                const retriedResponse = await axios(config)
                return retriedResponse
            } catch (err) {
                console.log(err)
                window.location.href = '/signup'
            }
            
        }
    }
}

export { setTokens, authorizedRequest }