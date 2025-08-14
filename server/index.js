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
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());
// express.json() helps us to get all the data in json format that we'll get from the frontend
app.use(cookieParser());
// cookie parseer will parse the data from the cookie that it will get from the frontend 

const allowedOrigins = [
  "https://mern-youtube-clone-yogi.onrender.com",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    // this is solving all the problem regarding to our cors problem 
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // Enable cookies/auth headers
}));

const PORT = process.env.PORT;


//route setup will take place here
app.use('/api/auth', AuthRoute);
app.use('/api/videos', VideoRoute);
app.use('/api/comments', CommentRoute);
app.use('/api/channels', ChannelRoute);
app.use('/api/upload', UploadRoute);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// Handle React routing, return all requests to React app
app.get('/*catchAll', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
})

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