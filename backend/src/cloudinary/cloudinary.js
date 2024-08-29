import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    upload_preset: process.env.UPLOAD_PRESET,
  });

export default cloudinary;