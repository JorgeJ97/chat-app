import Chat from '../models/chatModel.js';
import Message from '../models/messageModel.js';
import { getOnlineUser, io } from '../socket/socket.js';
import { getUserChats } from './usersController.js';
import mongoose from 'mongoose';

export const sendMessage = async (senderId, receiverId, message, imageUrl, videoUrl, docUrl) => {
    let isNewChat = false;

    if (!senderId || !receiverId) throw ({ status: 400, message: 'Invalid request' })
    if (!message && !imageUrl && !videoUrl && !docUrl) throw ({ status: 400, message: 'Invalid request' })

    // Check if the chat exists
    let chat = await Chat.findOne({
        participants: {
            $all: [senderId, receiverId]
        }
    })

    // If the chat does not exist, create a new chat
    if (!chat) {
        chat = new Chat({
            participants: [senderId, receiverId]
        })
        isNewChat = true;
        // const senderSocketId = getOnlineUser(senderId);
        // io.to(senderSocketId).emit('update_conversation')
    }
    // Create the message
    let newMessage = new Message({ senderId, receiverId, message, imageUrl, videoUrl, docUrl });

    // Add the message to the chat
    if (newMessage) {
        chat.messages.push(newMessage._id);
        chat.lastMessage = newMessage._id;
        // Increase the unread message counter for the receiver
        const currentCount = chat.unread.get(receiverId) || 0;
        chat.unread.set(receiverId, currentCount + 1);
    }

    // Save the chat and the new message to the database
    await Promise.all([chat.save(), newMessage.save()]);


    // ***Socket 


    // Check if the user is online, if the user is online, send the message in real time
    const receiverSocketId = getOnlineUser(receiverId);
    const senderSocketId = getOnlineUser(senderId);

    if (receiverSocketId) {

        const chatForReceiver = await getSingleChat(new mongoose.Types.ObjectId(receiverId), senderId);
        io.to(receiverSocketId).emit('new_message', newMessage, chatForReceiver );
        if(isNewChat){
            io.to(receiverSocketId).emit('new_chat', chatForReceiver)
        }
    }

    if (isNewChat) {
        const newChat = await getSingleChat(senderId, new mongoose.Types.ObjectId(receiverId));
        io.to(senderSocketId).emit('new_chat', newChat)

    }
    //*** */

    return {
        message: newMessage,
        chatId: chat._id
    };

}

//  Get all messages between two users
export const getMessage = async (senderId, receiverId) => {
    // Mark messages as read
    await Message.updateMany(
        { senderId: receiverId, receiverId: senderId, isRead: false },
        { $set: { isRead: true } }
    );

    const chat = await Chat.findOne({
        participants: {
            $all: [senderId, receiverId]
        }
    }).populate('messages')

    if (!chat) return {
        _id: '',
        messages: [],
        unread: {}
    };

    chat.unread.set(senderId, 0); // Reset the counter for the receiver
    await chat.save();

    return {
        _id: chat._id,
        messages: chat.messages,
        unread: chat.unread
    }

}

export const getSingleChat = async (userId, otherUserId) => {

    if (!userId || !otherUserId) throw { status: 400, message: 'Invalid request' };

    const chatData = await Chat.aggregate([
        {
            $match: {
                participants: {
                    $all: [userId, new mongoose.Types.ObjectId(otherUserId)],
                    $size: 2
                }
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'participants',
                foreignField: '_id',
                as: 'participants'
            }
        },
        {
            $lookup: {
                from: 'messages',
                localField: 'lastMessage',
                foreignField: '_id',
                as: 'lastMessage'
            }
        },
        {
            $project: {
                _id: 1,
                unread: 1,
                participants: {
                    $map: {
                        input: {
                            $filter: {
                                input: '$participants',
                                as: 'participant',
                                cond: { $ne: ['$$participant._id', userId] }
                            }
                        },
                        as: 'participant',
                        in: {
                            _id: '$$participant._id',
                            fullName: '$$participant.fullName',
                            email: '$$participant.email',
                            image: '$$participant.image'

                        }
                    }
                },
                lastMessage: { $arrayElemAt: ['$lastMessage', 0] }
            }
        }
    ]).exec();

    if (chatData.length === 0) return null;

    return {
        _id: chatData[0]._id,
        unread: chatData[0].unread,
        user: chatData[0].participants[0],
        lastMessage: chatData[0].lastMessage
    };

};
