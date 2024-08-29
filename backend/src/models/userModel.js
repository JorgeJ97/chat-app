import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required:true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: ''
    },
}, {timestamps: true})


userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)

}

userSchema.statics.comparePassword = async(receivedPassword, savedPassword) => {
    return await bcrypt.compare(receivedPassword, savedPassword)
}
export default model('User', userSchema)