import { Router} from "express";
import { getMessage, getSingleChat, sendMessage } from "../controllers/messageController.js";

const messageRouter = Router()

messageRouter.post('/send/:id', async(req, res) => {
    try {
        const {message, imageUrl, videoUrl, docUrl} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;
        const response = await sendMessage(senderId, receiverId, message, imageUrl, videoUrl, docUrl)
        res.status(200).json(response)
        
    } catch (error) {
        console.log( error.message)
        const status = error.status || 500;
        const message = error.message || 'Internal Server Error';
        res.status(status).json({error: message})
        
    }

    
})

messageRouter.get('/:id', async(req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;
        const response = await getMessage(senderId, receiverId)
        res.status(200).json(response)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
messageRouter.get('/single/:id', async(req, res) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;
        const response = await getSingleChat(senderId, receiverId)
        res.status(200).json(response)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
export default messageRouter;