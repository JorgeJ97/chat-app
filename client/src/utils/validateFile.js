
const validateFile = (file, fileType) => {
    const maxFileSize = 10 * 1024 * 1024; // 10 MB
    let validTypes;

    switch(fileType) {
        case 'video':
            validTypes = ['video/mp4','video/x-m4v','video/*','video/avi','video/mkv','video/webm','video/ogg'];
            break;
        
        case 'image':
            validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            break;
        
        case 'document':
            validTypes = ['.pdf', '.doc', '.docx','.txt','.xls','.xlsx','.ppt','.pptx','.odt','.ods','.odp']
            break;

        default:
            validTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    }



    if (!file) {
        return { valid: false, message: 'No file selected' };
    }

    if (!validTypes.includes(file.type)) {
        return { valid: false, message: 'File type not accepted' };
    }

    if (file.size > maxFileSize) {
        return { valid: false, message: 'The file is too large. The maximum size allowed is 10 MB.' };
    }

    return { valid: true };
};

export default validateFile;