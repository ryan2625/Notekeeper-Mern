const Note = require("../models/noteModel") 
const mongoose = require("mongoose")


const createNote = async (req, res) =>{
    const {title,description, topic} = req.body

    try{
        const user_id = req.user._id
        const noter = await Note.create({title, description, topic, user_id })
        res.status(200).json(noter)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

const getNotes = async(req, res) =>{
    const user_id = req.user._id
    const notes = await Note.find({ user_id }).sort({createdAt: -1})
    res.status(200).json(notes)   
}

const getNote = async (req, res) =>{
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: "Note not found"})
    }

    const note = await Note.findById(id)

    if (!note){
        return res.status(404).json({message: "Note not found"})
    } else {
        res.status(200).json(note)
    } 
}

const deleteNote = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: "Note not found"})
    }

    const note = await Note.findOneAndDelete({_id : id})

    if (!note){
        return res.status(404).json({message: "workout not found"})
    } else {
        res.status(200).json(note)
    } 
}

const updateNote = async (req, res) =>{
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: "Note not found"})
    }

    const note = await Note.findOneAndUpdate({_id : id}, {
        ...req.body})

        if (!note){
           return  res.status(400).json({ Message : "workout not found"})
        }

        res.status(200).json(note)
}


module.exports = {
    createNote,
    getNotes,
    getNote,
    deleteNote,
    updateNote
}