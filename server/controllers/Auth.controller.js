import { handleError } from "../helpers/handleError";
import User from "../models/user.model";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const Register = async (req,res , next) => {
    try {
        const { username , email , password} = req.body;
        const data = await User.findOne({email});
        if(data){
            // user is already registered
            next(handleError(409, 'User already registered.'))
        }
        const user = new User({
            username,
            email,
            password: bcryptjs.hashSync(password, 10)
        })
        await user.save();
        res.status(200).json({
            success: true,
            message: "Registration Successfull."
        })
    } catch (error) {
        next(handleError(500 , error.message))
    }
}
