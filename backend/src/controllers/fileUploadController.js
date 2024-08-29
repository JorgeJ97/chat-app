import hashFileBuffer from '../utils/hashFile.js';
import File from '../models/FileModel.js';
import uploadToCloudinary from '../cloudinary/uploadToCloudinary.js';
import checkFileExists from '../cloudinary/checkFileExist.js';

const getURLFile = async (file) => {
    if (!file) throw { status: 404, message: 'File required' }
    const fileBuffer = file.buffer;
    console.log('fileName', file.originalname)
    const hash = hashFileBuffer(fileBuffer);

    const foundFile = await checkFileExists(hash);

    if (foundFile) {
        const foundFileMongo = await File.findOne({hash});
        if(foundFileMongo){
            return {message: 'Success', url: foundFileMongo.url}
        }else {
            const newFile = new File({
                hash,
                url: foundFile.secure_url
            });
    
            await newFile.save();
    
            return {message: 'Success', url: newFile.url};
        }
    }


    else {
        const response = await uploadToCloudinary(fileBuffer, hash, file.originalname);
        const newFile = new File({
            hash,
            url: response.secure_url
        });

        await newFile.save();

        return {message: 'Success', url: newFile.url};
    }
}
export default getURLFile;