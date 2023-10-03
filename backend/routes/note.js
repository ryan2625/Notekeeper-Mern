const express = require('express');
const Note = require("../models/noteModel")
const {
    createNote,
    getNotes,
    getNote,
    deleteNote,
    updateNote
} = require("../controller/noteController")
const requireAuth = require("../middleWare/requireAuth")
const router = express.Router();

router.use(requireAuth)
//get all workout
router.get("/", getNotes)

//get single workout
router.get("/:id", getNote)

router.delete("/:id",  deleteNote)

router.post("/", createNote)

router.put("/:id", updateNote)

module.exports = router