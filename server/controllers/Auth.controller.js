import { handleError } from "../helpers/handleError.js";
import User from "../models/user.model.js";
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
export const Login = async(req,res,next) =>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email}).populate('channels', '_id name');
        if(!user){
            return next(handleError(404, 'user not found.'))
        }
        const isValidPassword =  bcryptjs.compare(password, user.password);
        if(!isValidPassword){
            return next(handleError(403, 'invalid login credentials.'))
        }
        const token = jwt.sign({
            id: user._id, // Using 'id' to match what verifyToken expects
            username: user.username,
            email: user.email,
            avatar: user.avatar
        }, process.env.JWT_SECRET)

        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV=== 'production'? 'none': 'strict',
            path: '/' 
        })
        const newUser = user.toObject({getters:true});
        delete newUser.password;
        res.status(200).json({
            success: true,
            user: newUser,
            message: 'Login successfull .'
        })
    } catch (error) {
        next(handleError(500 , error.message))
    }
}

export const GoogleLogin = async (req, res, next) =>{
    try {
        const {username , email , avatar} = req.body;
        let user
        user = await User.findOne({email}).populate('channels', '_id name')
        if(!user){
            // now we get the user from the google login way
            const password = crypto.randomBytes(16).toString('hex');
            // this crytpo in built in lib of node that we can use for create ramdom secured password
            const hashedPassword = bcryptjs.hashSync(password);
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                avatar
            })
            user = await newUser.save()
        }
        const token = jwt.sign({
            id: user._id, // Using 'id' to match what verifyToken expects
            username: user.username,
            email: user.email,
            avatar: user.avatar
        }, process.env.JWT_SECRET)

        res.cookie('access_token', token , {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/'
        })
        const newUser = user.toObject({getters: true})
        delete newUser.password
        res.status(200).json({
            success: true,
            user: newUser,
            message: 'Login Successfull.'
        })
    } catch (error) {
        next(handleError(500 , error.message))
    }
}
export const Logout =  (req,res,next) =>{
    try {
        res.clearCookie('access_token' , {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            path: '/'
        })
         res.status(200).json({
            success: true,
            message: 'Logout Successfull.'
        })
    } catch (error) {
        next(handleError(500 , error.message))
    }   
}