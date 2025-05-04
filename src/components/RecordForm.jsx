import React from 'react'

function RecordForm() {
  return (
    <div> 
        
        <h1>RecordForm</h1>

    <form onSubmit={dgd}>


            <label htmlFor="title"> Title </label>
            <input type="text"
                 id='title'
                 name='title'
                 required
                 value={props.title}
                 onChange={event => props.setTitle(event.target.value)}
            
            />
            
            <label htmlFor="description"> Description </label>
            <input type="text"
                 id='description'
                 name='description'
                 required
                 value={props.description}
                 onChange={event => props.setDescription(event.target.value)}
            
            />
            
            <label htmlFor="audio"> Audio File </label>
            <input type="file"
                   name="audio" 
                   accept="audio/*"
                 onChange={event => props.setAudio(event.target.files[0])}

            />
            <label htmlFor="date"> Date </label>

            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
   
           <button onClick={startRecording}>Start Recording</button>
   

    </form>



    </div>


    
  )
}

export default RecordForm


