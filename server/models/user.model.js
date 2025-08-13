import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    role:{
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
        required: true,
        trim: true
    },
    username:{
        type:String,
        required: true,
        trim : true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    channels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
    }],
    subscribedChannels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
    }],
    refreshToken: {
        type: String
    }
})

const User = mongoose.model('User' , userSchema, 'users')
export default User;