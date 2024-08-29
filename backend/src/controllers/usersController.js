import User from '../models/userModel.js';
import Chat from '../models/chatModel.js';
import extractPublicId from '../utils/extractPublicId.js';
import deleteFileToCloudinary from '../cloudinary/deleteFileToCloudinary.js';
import File from '../models/FileModel.js'
import mongoose from 'mongoose';


export const getUsers = async (loggedUserId) => {

    const users = await User.find({
        _id: {
            $ne: loggedUserId
        }
    }).select('-password')

    if (!users) return [];

    return users;

}

export const getUserChats = async (userId) => {
    if (!userId) throw { status: 400, message: 'Invalid request' };

    const chatParticipants = await Chat.aggregate([
        {
            $match: {
                participants: {
                    $all: [userId],
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
                participants:  {
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

    if (chatParticipants.length === 0) return [];

    return chatParticipants.map(chat => ({
        _id: chat._id,
        unread: chat.unread,
        user: chat.participants.find(p => p._id.toString() !== userId.toString()),
        lastMessage: chat.lastMessage
    }));
};


export const SearchUsers = async (search, userId) => {
    if (!search) return [];

    const querySearch = new RegExp(search, "i")

    const foundUsers = await User.find({
        $and: [
            {
                _id: {
                    $ne: userId
                }
            },

            {
                $or: [
                    { fullName: querySearch },
                    { email: querySearch }
                ]
            }
        ]
    }).select('-password')

    return foundUsers;
}

export const updateUserData = async (user, fullName, image) => {
    if (fullName === '' && image === '') {
        return {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            image: user.image
        };
    }

    const updateFields = {};
    if (fullName !== '') {
        updateFields.fullName = fullName;
    }
    if (image !== '') {
        updateFields.image = image;
    }

    await User.updateOne({ _id: user._id }, updateFields);

    const updatedUser = await User.findById(user._id).select('-password');

    return {
        id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        image: updatedUser.image
    }
}

export const deleteUserImage = async (userId, imageUrl) => {

    await User.updateOne({ _id: userId }, {
        image: ''
    });
    const publicId = extractPublicId(imageUrl);
    const result = await deleteFileToCloudinary(publicId);
    if (result) {
        await File.deleteOne({ url: imageUrl })
    }

    const user = await User.findById({ _id: userId }).select('-password');
    return {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image
    }
}

export const getUserDetails = async (userId) => {
    if (!isValidObjectId(userId)) throw { status: 404, message: 'User not found' };
    const user = await User.findById({ _id: userId }).select('-password')
    if (!user) throw { status: 404, message: 'User not found' };
    return {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image
    }
}

const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id) && /^[a-fA-F0-9]{24}$/.test(id);
};


