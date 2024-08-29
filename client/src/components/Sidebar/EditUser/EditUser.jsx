import React, { useRef, useState, useCallback } from 'react';
import uploadFiles from '../../../utils/uploadFiles';
import useUpdateUser from '../../../hooks/useUpdateUser';
import { errorNotification } from '../../../utils/notifications';
import useLogout from '../../../hooks/useLogout';
import ImagePreview from './Image/ImagePreview';
import DefaultImage from './Image/DefaultImage';
import DeleteButton from './Buttons/DeleteButton';
import EditButton from './Buttons/EditButton';
import NameInput from './Buttons/NameInput';
import validateFile from '../../../utils/validateFile';

const EditUser = ({ onClose, user }) => {
    const { logout } = useLogout();
    const { updateUser, loading, deleteUserImage } = useUpdateUser();

    const [data, setData] = useState({
        fullName: user?.fullName,
        image: user?.image
    });
    const [imagePreview, setImagePreview] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [editName, setEditName] = useState(false);
    const uploadImageRef = useRef();

    const handleOnChange = useCallback((e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }, []);

    const handleUploadImage = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.target.files[0];

        const validation = validateFile(file, 'image');
        if (!validation.valid) {
            return errorNotification(validation.message);
        }
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);

    }, [setImageFile, setImagePreview]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        e.stopPropagation();
        let url;
        if (imageFile) {
            const uploadImage = await uploadFiles(imageFile);
            url = uploadImage?.url;
            if (!url) {
                errorNotification('Session expired, login again');
                return logout();
            }
        }
        await updateUser({
            fullName: data?.fullName,
            image: url
        });
        onClose();
    }, [data, imageFile, logout, onClose, updateUser]);

    const handleOpenUpload = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadImageRef.current.value = '';
        uploadImageRef.current.click();
    }, []);

    const handleDelete = useCallback(async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (data?.image) await deleteUserImage(data?.image);
        setImageFile('');
        setImagePreview('');
        setData((prevData) => ({
            ...prevData,
            image: ''
        }));
    }, [data?.image, deleteUserImage]);

    return (
        <div className='flex items-center justify-center fixed bottom-0 top-0 right-0 left-0 bg-gray-900 bg-opacity-40 z-10'>
            <div className=' bg-zinc-700 py-6 p-4 m-1 rounded w-full max-w-sm text-white'>
                <h2 className=' font-semibold text-xl text-center'>Profile Details</h2>
                <form className=' grid gap-3 mt-10' onSubmit={handleSubmit}>
                    <div>
                        <div className="grid grid-cols-[2fr,1fr]">
                            {imagePreview ? (
                                <ImagePreview onClick={handleOpenUpload} src={imagePreview} />
                            ) : data?.image ? (
                                <ImagePreview onClick={handleOpenUpload} src={data?.image} />
                            ) : (
                                <DefaultImage onClick={handleOpenUpload} name={data?.fullName} />
                            )}
                            <label htmlFor="image" className='flex justify-center items-center'>
                                <DeleteButton onClick={handleDelete} />
                                <input
                                    type="file"
                                    id="image"
                                    className="hidden"
                                    onChange={handleUploadImage}
                                    ref={uploadImageRef}
                                    accept="image/jpeg,image/jpg,image/png"
                                />
                            </label>
                        </div>
                    </div>
                    <div className='grid grid-cols-[2fr,1fr] text-lg mb-4'>
                        <div>
                            {editName ? (
                                <NameInput value={data.fullName} onChange={handleOnChange} onClick={() => setEditName(false)} />
                            ) : (
                                <div className='flex items-center w-full h-10'>{data.fullName}</div>
                            )}
                        </div>
                        <div className='flex justify-center items-center' title='Edit name'>
                            {!editName && <EditButton onClick={() => setEditName(true)} />}
                        </div>
                    </div>
                    <div className=' divider my-1'></div>
                    <div className='flex gap-3 w-fit ml-auto'>
                        <button onClick={onClose} className='btn bg-blue-800 text-white text-lg hover:bg-neutral'>Cancel</button>
                        {loading ? <div className='loading loading-spinner'></div> : <button type="submit" className='btn bg-blue-800 text-white text-lg hover:bg-neutral'>Save</button>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default React.memo(EditUser);