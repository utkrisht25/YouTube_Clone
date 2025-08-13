import jwt from 'jsonwebtoken';
import { handleError } from '../helpers/handleError.js';
import  User  from '../models/user.model.js';

export const verifyToken = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.access_token;
        
        if (!token) {
            return next(handleError(401, 'You need to login first'));
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded) {
            return next(handleError(403, 'Invalid token'));
        }

        // Find user from decoded token
        const user = await User.findById(decoded.id).select('-password');
        
        if (!user) {
            return next(handleError(404, 'User not found'));
        }

        // Add user to request object
        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return next(handleError(403, 'Invalid token'));
        }
        if (error.name === 'TokenExpiredError') {
            return next(handleError(401, 'Token has expired'));
        }
        next(handleError(500, error.message));
    }
};
