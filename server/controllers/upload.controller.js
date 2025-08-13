import { handleError } from "../helpers/handleError.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "yt-clone/avatars",
        allowed_formats: ["jpg", "jpeg", "png", "gif"],
        transformation: [{ width: 500, height: 500, crop: "fill" }]
    }
});

// Configure multer
const upload = multer({ storage: storage });

export const uploadFile = async (req, res, next) => {
    try {
        if (!req.file) {
            return next(handleError(400, "No file uploaded"));
        }

        res.status(200).json({
            success: true,
            fileUrl: req.file.path,
            message: "File uploaded successfully"
        });
    } catch (error) {
        next(handleError(500, error.message));
    }
};
