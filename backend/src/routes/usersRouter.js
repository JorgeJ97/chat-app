import { Router} from "express";
import { getUsers } from "../controllers/usersController.js";

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
    try {
        const loggedUserId = req.user._id
        const response = await getUsers(loggedUserId)
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({error: error.message})
        
    }

})

export default usersRouter;