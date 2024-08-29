import cloudinary from './cloudinary.js'
import dotenv from 'dotenv';
dotenv.config();

const uploadToCloudinary = async(fileBuffer, hash, fileName) => {

    const ext = fileName.split('.').pop();
    
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({filename_override: `${hash}.${ext}`, resource_type: 'auto', public_id: hash, upload_preset: process.env.UPLOAD_PRESET},
            (error, result) => {
                if(error) reject(error);
                else resolve(result);
            }
        );
        uploadStream.end(fileBuffer);
    })

};

export default uploadToCloudinary;