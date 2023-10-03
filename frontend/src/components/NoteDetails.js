import React, { useContext } from 'react'
import { useNotesContext } from '../hooks/UseNotesContext'
import {BsFillTrash3Fill} from 'react-icons/bs'
import {FaPencilAlt} from 'react-icons/fa'
import { useState } from 'react'
import { UseAuthContext } from '../hooks/UseAuthContext'
import { DimmerContext } from '../context/DimmerContext'

function NoteDetails({note, setEditBool, setEditNote}) {

  const edit = useContext(DimmerContext)

  const handlingClick = () =>{
    setEditBool()
    setEditNote(note)
  }

  const { dispatch } = useNotesContext()
  const { user } = UseAuthContext()

  const handleClick = async () =>{

    if (!user){
      return
    }
    const response = await fetch("http://localhost:3001/api/notes/" + note._id, {
      method: "DELETE",
      headers: {
        "Authorization" : `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok){
      dispatch({type : "DELETE_NOTE", payload: json})
    }
  }
  
  return (
    <div className={"note-details" + (edit ? " dimmer2" : " ")}>
        <h4>{note.title}</h4>
        <p><strong>Topic: </strong>{note.topic}</p>
        <p><strong>Description: </strong>{note.description}</p>
        <p>Date Created: {note.createdAt.slice(0,10)}</p>
        <span onClick={handleClick} className='delete-icon'>
          <BsFillTrash3Fill />
        </span>
        <span  className='edit-icon'>
          <FaPencilAlt onClick={() => handlingClick()} />
        </span> 
    </div>
  )
}

export default NoteDetails