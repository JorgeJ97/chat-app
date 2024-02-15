import User from '../models/userModel.js'

export const getUsers = async(loggedUserId) => {

    const users = await User.find({
        _id:{
            $ne: loggedUserId
        }
    }).select('-password')

    if(!users) return [];

    return users;

}