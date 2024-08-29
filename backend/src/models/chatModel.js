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
    ],

    unread: {
        type: Map,
        of: Number,
        default: {}
    },

    lastMessage : {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }


}, {timestamps: true});

chatSchema.index({ participants: 1 });
chatSchema.index({ lastMessage: 1 });

export default model('Chat', chatSchema)