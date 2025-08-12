import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';


dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true
}))

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI, {dbName: 'yogi-yt-clone'})
.then(() => console.log('connected to databse'))
.catch(err => console.log('databse connection failed', err))

app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`);
    
})