import { Router} from "express";
import { SearchUsers, deleteUserImage, getUserChats, getUserDetails, getUsers, updateUserData } from "../controllers/usersController.js";


const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
    try {
        const loggedUserId = req.user._id;
        const response = await getUsers(loggedUserId);
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({error: error.message});
        
    }

});

usersRouter.get('/user-details/:userId', async (req,res) => {
    try {
        const {userId} = req.params;
        const response = await getUserDetails(userId);
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
        const status = error.status || 500;
        const message = error.message || 'Internal Server Error';
        res.status(status).json({error: message});
    }
});
usersRouter.get('/user-chats', async (req,res) => {
    try {
        const userId = req.user._id;
        const response = await getUserChats(userId);
        res.status(200).json(response);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal Server Error';
        res.status(status).json({error: message});
    }
});

usersRouter.get('/search-users', async (req,res) => {
    try {
        const userId = req.user._id;
        const {search} = req.query;
        const response = await SearchUsers(search, userId);
        res.status(200).json(response);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal Server Error';
        res.status(status).json({error: message});
    }
});

usersRouter.put('/update-user', async (req,res) => {
    try {
        const user = req.user;
        const {fullName, image} = req.body;
        const response = await updateUserData(user, fullName, image);
        res.status(200).json(response);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal Server Error';
        res.status(status).json({error: message});
    }
})
usersRouter.delete('/delete-user-image', async (req,res) => {
    try {
        const {imageUrl} = req.query
        const userId = req.user._id;
        const response = await deleteUserImage(userId, imageUrl);
        res.status(200).json(response);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal Server Error';
        res.status(status).json({error: message});
    }
})

export default usersRouter;