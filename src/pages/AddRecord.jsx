import React from 'react'
import { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authorizedRequest } from '../lib/api'



function AddRecord() {


    const navigate = useNavigate()

    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [audioFile,setAudiofile] = useState(null)
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")
    
    const [error,setErorr] = useState('')
    
    useEffect(() => {
      
        (async () => {

          try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}categories/`)
          
            setCategories(response.data);
          } catch (err) {
            console.error("Failed to fetch categories", err);
          }
        })()  }, [])



    const handleSubmit = async (event) => {
        event.preventDefault()

        const userId = localStorage.getItem('user_id')
        if (!userId) {
          setErorr('no user id')
          return
           }
      
        const formData = new FormData()
        formData.append('title',title)
        formData.append('description',description)
        formData.append('audio_file',audioFile)
        formData.append('category', selectedCategory)
        formData.append('user', userId)  

      
            try {

             
              const response = await authorizedRequest("POST", "recordings/", formData)
                if (response && response.data) {
                  console.log("Recording Uploaded", response.data)
                 
                  alert("Recording Uploaded Successfully")
                  navigate('/')
              } else {
                  console.error("No data received", response)
                  setErorr("An error occurred, please try again.")
              }
          
            } catch (error) {
              console.log(error)
              setErorr('An error occurred.')
            
            }
          }
        
        
    
  return (
    <div>
        <h1>Add Record</h1>  
        <form onSubmit={handleSubmit} encType="multipart/form-data">


        <label>
            Title:
                <input 
                    
                    type="text" 
                    name="title"
                    placeholder="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                    
                    />
        </label>
        <hr />

      
        <label>
            Description:       
                <input   
                type="text" 
                name="description"
                placeholder="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
                
                />
        </label>
        <hr />

        <label>
                Category: 
                    <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
                        <option value="">Select a Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                             ))}
                    </select>
        </label>
      
      <label>
      Audio File:: 
             
             
              <input 
             
             type="file" 
             accept='audio/*'             
             onChange={(event) => setAudiofile(event.target.files[0])}
             required
               
             />
             
              
      </label>
      <hr />

        
           

             
            <button type="submit">Upload</button>

        </form>
        
        
        </div>
    

  )
}

export default AddRecord