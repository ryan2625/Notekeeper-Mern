const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")
const validator = require("validator")
const Schema = mongoose.Schema


const userSchema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true 
    },
    password : {
        type: String,
        required: true
    }
})

userSchema.statics.signup = async function(email, password) {

    if (!email || !password) {
        throw Error("All fields must be filled")
    }

    if (!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    
    if (!validator.isStrongPassword(password)){
        throw Error("Password not strong enough")
    }
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error("Email already exists")
    }

    const salt = await bcryptjs.genSalt(10)
    const hash = await bcryptjs.hash(password, salt)

    const user = await this.create({ email, password: hash })

    return user
}

userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled")
    }
    const user = await this.findOne({ email })

    if (!user) {
        throw Error("Wrong Email")
    }

    const match = await bcryptjs.compare(password, user.password)

    if (!match){
        throw Error("Wrong Password")
    }

    return user
}

module.exports =  mongoose.model("User", userSchema)