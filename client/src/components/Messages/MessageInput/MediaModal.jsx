import React, { useEffect, useRef } from 'react'
import { IoClose } from "react-icons/io5";

const MediaModal = ({ dialogRef, handleClose, src, type }) => {

    const videoRef = useRef(null);

    useEffect(() => {

        const handleDialogClose = () => {
            if (videoRef.current) {
                videoRef.current.pause(); // Pause the video
                videoRef.current.currentTime = 0; // Reset video to start
            }
        };
        dialogRef.current.addEventListener('close', handleDialogClose);
        
    }, [dialogRef])


    return (
        <dialog ref={dialogRef} className="relative  rounded-lg p-0 max-w-full max-h-full bg-transparent backdrop:bg-black backdrop:bg-opacity-70">
            <div className="flex justify-center items-center">
                {type === 'image' ? (
                    <img src={src} className="max-w-[70%] h-full object-contain rounded-lg mt-10" alt="Image modal view" />
                ) : (
                    <video src={src} ref={videoRef} className='max-w-[70%] h-full object-contain rounded-lg mt-10' controls/>
                )}
                <button
                    onClick={handleClose}
                    className="absolute right-[100px] top-0 bg-black bg-opacity-70 text-white px-4 py-2 rounded"
                >
                    <IoClose size={20} />
                </button>
            </div>
        </dialog>
    )
}

export default MediaModal;
