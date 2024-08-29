import { Router } from "express";
import getURLFile from "../controllers/fileUploadController.js";

const fileUploadRouter = Router();

fileUploadRouter.post('/', async (req, res) => {    
    try {
        const file = req.file
        const response = await getURLFile(file);
        res.status(200).json(response);
    } catch (error) {
        const status = error.status || 500;
        const message = error.message || 'Internal Server Error';
        res.status(status).json({ error: message });

    }
})

export default fileUploadRouter;