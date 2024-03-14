import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const CONNECTION_DB_URL = process.env.MONGO_DB_URL
const CONNECTION_LOCAL_DB = 'mongodb://localhost/chatdb'

const mongoConnection = () => {
    
    mongoose.connect(CONNECTION_DB_URL)
    .then(db => console.log('MongoDB is conected'))
    .catch(e => console.log('Error connecting to DB', e.message))

}


export default mongoConnection;