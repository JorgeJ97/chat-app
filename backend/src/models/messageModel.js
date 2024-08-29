import { Schema, model } from "mongoose";

const messageSchema = new Schema({

    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },

    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },

    message: {
        type: String,

    },

    imageUrl : {
        type: String,
        default: ""
    },

    videoUrl: {
        type: String,
        default: ""
    },

    docUrl: {
        type: String,
        default: ''
    },

    isRead: {
        type: Boolean,
        default: false
    }


}, {timestamps: true});

/*Add composite index*/
messageSchema.index({ senderId: 1, receiverId: 1, isRead: 1 });

export default model('Message', messageSchema)