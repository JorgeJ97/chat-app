import mongoose from 'mongoose'

const CONNECTION_URL = process.env.MONGO_DB_URL
const CONNECTION_LOCAL_URL = 'mongodb://localhost/chatdb'

const mongoConnection = () => {
    
    mongoose.connect(CONNECTION_URL)
    .then(db => console.log('MongoDB is conected'))
    .catch(e => console.log('Error connecting to DB', e.message))

}


export default mongoConnection;