import React from 'react'
import "./Modal1.css"
import { UseAuthContext } from '../hooks/UseAuthContext'
import { useState } from 'react'
function Modal1({editNote, setEditBool}) {

    const [title, setTitle] = useState('')
    const [topic, setTopic] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const {user} = UseAuthContext()

    const updatingData = async () =>{
        const note = {title, description, topic} 
        
        if (note.title == ""){
            note.title = editNote.title
        }
        if (note.topic == ""){
            note.topic = editNote.topic
        }
        if (note.description == ""){
            note.description = editNote.description
        }

try {
    const response = await fetch("http://localhost:3001/api/notes/" + editNote._id, {
        method: "PUT",
        body: JSON.stringify(note),
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${user.token}`
        }
    });

    if (response.ok) {
        const updatedNote = await response.json();
        console.log("Note updated:", updatedNote);
    } else {
        console.log("Error: ", response.status);
    }
            } catch (err) {
    console.log(err);
}
          
    }


  return (
    <div className="modal">
        <h1>Edit Note</h1>
        <form  className="create" onSubmit={updatingData}>
        <h3>Add a new Note</h3>

        <label htmlFor="">Note Title</label>
        <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}/>
    

    <label htmlFor="">Topic:</label>
<input 
        type="text"
        onChange={(e) => setTopic(e.target.value)}
        value={topic}/>


    <label htmlFor="">Description:</label>
<input 
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}/>

        <button>Edit Note</button>
        <button onClick={setEditBool} className="cancel-button">Cancel</button>
        {error && <div className="error">{error}</div>}
    </form>
    </div>
  )
}

export default Modal1