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

    gender: {
        type: String,
        enum: ['male', 'female']
    },

    image: {
        type: String,
        default: ''
    },

    isOnline: {
        type: String,
        default: '0'
    }
}, {timestamps: true})


userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)

}

userSchema.statics.comparePassword = async(receivedPassword, savedPassword) => {
    return await bcrypt.compare(receivedPassword, savedPassword)
}
export default model('User', userSchema)