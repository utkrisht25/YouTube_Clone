import express from 'express';
import { Register } from '../controllers/Auth.controller.js';


const AuthRoute = express.Router();

AuthRoute.post('/register', Register);


export default AuthRoute;