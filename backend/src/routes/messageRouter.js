import { Router} from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js";

const messageRouter = Router()

messageRouter.post('/send/:id', async(req, res) => {
    try {
        const {message} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;
        const response = await sendMessage(senderId, receiverId, message)
        res.status(200).json(response)
        
    } catch (error) {
        console.log('Error in sendMessage', error.message)
        res.status(400).json({error: error.message})
        
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
export default messageRouter;