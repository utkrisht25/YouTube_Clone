import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true
}))

const PORT = process.env.PORT;

app.listen(PORT, () =>{
    console.log(`server is running on port ${PORT}`);
    
})