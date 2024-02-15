import { Router } from "express";
import authRouter from "./authRouter.js";
import messageRouter from "./messageRouter.js";
import usersRouter from "./usersRouter.js";
import validateToken from "../middleware/validateToken.js";

const router = Router()



router.use('/auth', authRouter)
router.use('/message',validateToken, messageRouter)
router.use('/users',validateToken, usersRouter)

export default router;