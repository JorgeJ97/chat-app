import cloudinary from "./cloudinary.js";

const deleteFileToCloudinary = (pulicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(pulicId, (error, result) => {
            if(error) reject(error);
            else resolve(result);

        })
        
    })

};

export default deleteFileToCloudinary;