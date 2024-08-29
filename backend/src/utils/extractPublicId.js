import dotenv from 'dotenv';
dotenv.config();

const extractPublicId = (url) => {
    const urlArray = url.split('/');
    const hashWithExtension = urlArray.pop(); 
    const [hash] = hashWithExtension.split('.');
    return `${process.env.UPLOAD_PRESET}/${hash}`;

}

export default extractPublicId;