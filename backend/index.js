const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require("./routes/note")
const userRoutes = require("./routes/user")
const { configDotenv } = require('dotenv');
const app = express()
const cors = require('cors');


require('dotenv').config()

const corsOptions = {
    origin: "http://localhost:3000" // frontend URI (ReactJS)
}

app.use(cors(corsOptions));

app.use(express.json())

app.use((req, res, next) =>{
    console.log("Console logiung")
    next()
})



app.use("/api/notes", noteRoutes)
app.use("/api/user", userRoutes)

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () =>{
        console.log("Server running on port 3k")
    })
})
.catch((err) => {
    console.log(err)
})

