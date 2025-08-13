import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import AuthRoute from './routes/Auth.route.js';
import VideoRoute from './routes/video.route.js';
import CommentRoute from './routes/comment.route.js';
import ChannelRoute from './routes/channel.route.js';
import UploadRoute from './routes/upload.route.js';
import './models/channel.model.js';  // Import models to ensure they're registered
import './models/video.model.js';
import './models/comment.model.js';

dotenv.config();
const app = express();

app.use(express.json());
// express.json() helps us to get all the data in json format that we'll get from the frontend
app.use(cookieParser());
// cookie parseer will parse the data from the cookie that it will get from the frontend 
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true
}))

const PORT = process.env.PORT;


//route setup will take place here
app.use('/api/auth', AuthRoute);
app.use('/api/videos', VideoRoute);
app.use('/api/comments', CommentRoute);
app.use('/api/channels', ChannelRoute);
app.use('/api/upload', UploadRoute);


mongoose.connect(process.env.MONGO_URI, {dbName: 'yogi-yt-clone'})
.then(() => console.log('connected to databse'))
.catch(err => console.log('databse connection failed', err))

app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`);
})

app.use((err,req,res,next) =>{
    const statusCode = err.statusCode || 500;
    const  message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});