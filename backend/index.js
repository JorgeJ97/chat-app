import { app } from "./src/app.js";
import mongoConnection from './src/database.js'
import {Server} from 'socket.io';
import {createServer} from 'node:http';

const PORT = process.env.PORT ?? 3000

const server = createServer(app)

// const io = new Server(server, {
//     cors: {
//         origin: 'http://127.0.0.1:5173'
//     }
// })



// // Runs when client connects
// io.on('connection', (socket) => {
//     console.log('an user has conected')

// // Runs when client disconnects
//     socket.on('disconnect', () =>{
//         io.emit('message', 'A user has left the chat')
//         console.log('an user has disconnected')
//     })

// // Broadcast when user connects
//     socket.broadcast.emit('message', 'A user has joined the chat')

// // Listen for chat_message
//     socket.on('chat_message', (data)=> {
//         io.emit('chat_message', data) // emit chat_message for all clients


//     })

// })




app.listen(PORT, () => {
    mongoConnection()
    
    console.log(`Server running on port ${PORT}`)
})