import React from "react";
import { MdOutlineModeEdit } from "react-icons/md";

const ImagePreview = ({ onClick, src }) => (
    <div
        className="my-1 avatar flex items-center cursor-pointer rounded w-16 h-16"
        title={'Change image'}
        type="button"
        onClick={onClick}
    >
        <div className="relative w-full rounded-full">
            <img src={src} alt="User Avatar" className="rounded-full w-full h-full" />
            <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-100 hover:opacity-50 flex items-center justify-center">
                <button className="absolute flex items-center justify-center text-white" type="button">
                    <MdOutlineModeEdit className="w-6 h-6" />
                </button>
            </div>
        </div>
    </div>
);

export default React.memo(ImagePreview);