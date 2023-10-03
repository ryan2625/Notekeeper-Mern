import React from 'react'
import { useState } from 'react'
import { useNotesContext } from '../hooks/UseNotesContext'
import { UseAuthContext } from '../hooks/UseAuthContext'
function NoteForm({edit}) {

    const {dispatch} = useNotesContext()

    const [title, setTitle] = useState('')
    const [topic, setTopic] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const {user} = UseAuthContext()


    const handleSubmit = async (e) =>{
        e.preventDefault()
        if (!user){
            setError("You must be logged in to add a new workout")
            return
        }

        const note = {title: title, description: description, topic: topic}

        console.log(note)

        const response = await fetch("http://localhost:3001/api/notes/", {
            method: "POST",
            body: JSON.stringify(note),
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok){
            setError(json.error)
        }

        if (response.ok){
            setTitle("")
            setTopic("")
            setDescription("")
            setError(null)
            console.log("New Note added", json)
            let jsonArray = Object.values(json)
            dispatch({type: "CREATE_NOTE", payload: jsonArray})
            window.location.reload();
        }
    }


  return (<>
    <form  className="create" onSubmit={handleSubmit}>
        <h3>Add a new Note</h3>

        <label htmlFor="">Note Title</label>
        <input className={edit ? "dimmer3" : ""}
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}/>
    

    <label htmlFor="">Topic:</label>
<input className={edit ? "dimmer3" : ""}
        type="text"
        onChange={(e) => setTopic(e.target.value)}
        value={topic}/>


    <label htmlFor="">Description:</label>
<input className={edit ? "dimmer3" : ""}
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}/>

        <button className={edit ? "dimmer" : ""}>Add Note</button>
        {error && <div className="error">{error}</div>}
    </form>
    </>
  )
}

export default NoteForm