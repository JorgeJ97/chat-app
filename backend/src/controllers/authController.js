
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { io } from '../socket/socket.js'

export const signUp = async (fullName, email, password)=> {

    const userFound = await User.findOne({email})
    if(userFound) {
        return {
            registration: false,
            msg: 'Already exist an user with this email'
        }
        }

    const user = new User({
        fullName,
        email,
        password: await User.encryptPassword(password)
    });
    const savedUser = await user.save();
    const token = jwt.sign({id: savedUser._id}, process.env.JWT_SECRET, { expiresIn: '24h'} );

    io.emit("new_user", true);

    return {
        user: {
            id: savedUser._id,
            fullName: savedUser.fullName,
            email: savedUser.email,
            image: savedUser.image
        },
        registration: true,
        msg: 'Registration completed',
        token
    };
};

export const signIn = async (email, password) => {

    const userFound = await User.findOne({email})
    if(!userFound) return { isLogged: false, msg: 'Invalid email or password'}
    const macthPassword = await User.comparePassword(password, userFound.password)
    if(!macthPassword) return { isLogged: false, msg: 'Invalid email or password'}
    const token = jwt.sign({id: userFound._id}, process.env.JWT_SECRET, { expiresIn: '24h'})

    return {
        user: {
            id: userFound._id,
            fullName: userFound.fullName,
            email: userFound.email,
            image: userFound.image
        },
        isLogged: true,
        msg: 'Successfully logged in',
        token
    }


}