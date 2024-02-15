import { Schema, model } from "mongoose";

const chatSchema = new Schema({
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message',
            default: []
        }
    ]

}, {timestamps: true})

export default model('Chat', chatSchema)