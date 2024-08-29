import { Schema, model } from "mongoose";

const fileSchema = new Schema({
    hash: {
        type: String,
        require: true
    },

    url: {
        type: String,
        require: true
    }
})

export default model('File', fileSchema);