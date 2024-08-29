import express from 'express'
import {Server} from 'socket.io';
import {createServer} from 'node:http';
import Chat from '../models/chatModel.js'

const ONLINE_USERS = 'online_users';
const CHAT_MESSAGE = 'chat_message'


const app = express();
const server = createServer(app)




const io = new Server(server, {
    cors: {
        origin: ['http://127.0.0.1:5173'],
        methods: ['GET','POST']
    }
})

const onlineUsers = {};

export function getOnlineUser (receiverId) {
    return onlineUsers[receiverId];
};

// Runs when client connects
io.on('connection', (socket) => {
    console.log('an user has conected',socket.id)
    const userId = socket.handshake.query.userId;
    if(userId != "undefined") onlineUsers[userId] = socket.id;
    io.emit(ONLINE_USERS, Object.keys(onlineUsers));

// Runs when client disconnects
    socket.on('disconnect', () =>{
        console.log('an user has disconnected', socket.id);
        delete onlineUsers[userId];
        io.emit(ONLINE_USERS, Object.keys(onlineUsers));
    })
// Mark messages as read while a chat is open
    socket.on("mark_as_read", async ({ chatId, userId }) => {
        try {
            await Chat.findByIdAndUpdate(chatId, { $set: { [`unread.${userId}`]: 0 } });
            
        } catch (error) {
            console.error("Error marking chat as read:", error);
            
        }

    })



//------------------ For group chat functionality ---------------

// Broadcast when user connects
    socket.broadcast.emit('message', 'A user has joined the chat')

// Listen for chat_message
    socket.on(CHAT_MESSAGE, (data)=> {
        io.emit(CHAT_MESSAGE, data) // emit chat_message for all clients
    })
// --------------------------------------------------------------
})

export {io, app, server}