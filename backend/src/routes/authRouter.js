import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";

const authRouter = Router()

authRouter.post('/signup', async (req, res) => {
    try {
        const {fullName, email, password} = req.body

        const {user, registration,msg, token} = await signUp(fullName, email, password)
        
        // Set cookies
        res.cookie('jwt',token,{
            httpOnly: true, 
            secure: process.env.NODE_ENV !== 'development', 
            sameSite: 'strict'
        })

        res.status(201).json({user, registration, msg})
        
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
} )

authRouter.post('/signin', async (req, res) => {
    try {
        const {email, password} = req.body

        const response = await signIn(email, password)
        
        // Set cookies
        res.cookie('jwt', response.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', 
            sameSite: 'strict'
        })

        res.status(200).json(response.user)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
} )

authRouter.post('/logout', async (_req, res) => {
    try {
        res.cookie('jwt', '', {maxAge: 0});
        res.status(200).json({msg: 'Logged out successfully'})

    } catch (error) {
        res.status(500).json({error: 'Internal server error'})
        
    }
})


export default authRouter;