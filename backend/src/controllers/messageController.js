import Chat from '../models/chatModel.js'
import Message from '../models/messageModel.js'

export const sendMessage = async (senderId, receiverId, message) => {

    if(!senderId || !receiverId || !message) throw Error('Invalid request')

    let chat = await Chat.findOne({
        participants: { 
            $all: [senderId, receiverId]
        }
    })

    if(!chat) {
        chat = new Chat({
            participants: [senderId, receiverId]
        })
    }

    let newMessage = new Message({senderId, receiverId, message});

    
    if(newMessage){
        chat.messages.push(newMessage._id);
    }
    
    
    await Promise.all([chat.save(), newMessage.save()]);
    
    return newMessage;

}

export const getMessage = async (senderId, receiverId) => {

    const chat = await Chat.findOne({
        participants: { 
            $all: [senderId, receiverId]
        }
    }).populate('messages')

    if(!chat) return [];

    return chat.messages;

}