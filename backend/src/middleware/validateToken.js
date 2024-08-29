import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const validateToken = async (req, res, next) => {

    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized, no token provided' })
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.log('error:', err.message)
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Unauthorized, invalid token' });
            }
            return res.status(401).json({ error: 'Unauthorized, invalid token' });
        }


        const user = await User.findById(decoded.id).select('-password')

        if (!user) return res.status(404).json({ error: 'User not found' })

        req.user = user;

        next();

    } catch (error) {
        console.log('Error in validateToken middleware', error.message)
        res.status(500).json({ error: 'Internal server error' })

    }


}

export default validateToken;