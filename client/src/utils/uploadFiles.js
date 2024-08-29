import { errorNotification } from "./notifications";
const ENDPOINT_UPLOAD_FILE = 'api/upload-file';

const uploadFiles = async (file) => {

    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${ENDPOINT_UPLOAD_FILE}`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to upload file');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error.message);
        errorNotification('Failed to upload file');
    }

}

export default uploadFiles;


