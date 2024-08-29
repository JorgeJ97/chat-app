import cloudinary from "./cloudinary.js"
import dotenv from 'dotenv';
dotenv.config();


const checkFileExists = async (public_id) => {
    try {
        const result = await cloudinary.api.resource(`${process.env.UPLOAD_PRESET}/${public_id}`);
        return result;
    } catch (error) {
        console.log('checkFileExist',error)
        if (error.error.http_code === 404) {
            return null;
        }else {
            console.error('Error checking file existence:', error)
        }
        throw error.error;
    }
};

export default checkFileExists;