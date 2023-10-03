import React from 'react'
import { useEffect, useState, useContext} from "react"
import NoteDetails from '../components/NoteDetails'
import NoteForm from '../components/NoteForm'
import { useNotesContext } from '../hooks/UseNotesContext'
import Modal1 from '../components/Modal1'
import { UseAuthContext } from '../hooks/UseAuthContext'
import { DimmerContext } from '../context/DimmerContext'

function Home({edit, setEditBool}) {

    

    const editValue = edit

    const {user} = UseAuthContext()
    
    const {notes, dispatch} = useNotesContext()

    const [editNote, setEditNote] = useState(null)


    useEffect(() =>{
        const fetchNotes = async () =>{
            const response = await fetch("http://localhost:3001/api/notes/", {
                headers: {
                    "Authorization" : `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok){
                dispatch({type: "SET_NOTES", payload: json})
            }
        }
        if (user){
            fetchNotes()
        }
    
    }, [])

  return (
    <DimmerContext.Provider value={editValue}>
        <div className="home">
            <div className="notes">
                {notes && notes.map(note => (
                    <NoteDetails key={note._id} note={note} setEditBool={setEditBool} setEditNote={setEditNote}/>
                ))}
            </div>
            <NoteForm edit={edit}/>
            <div className={edit ? "modalContainer show" : "modalContainer"}>
                {edit && <Modal1 editNote={editNote} setEditBool={setEditBool}/>}
            </div>
        </div>
    </DimmerContext.Provider>    
  )
}

export default Home