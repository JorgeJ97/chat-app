import React from 'react'
import { FaImages } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";

const OpenFiles = ({handleFilePreview}) => {
  return (
    <div className="absolute bg-white rounded shadow bottom-14 w-44 h-44 p-4">
    <form className="grid gap-2 grid-cols-2">
        <label htmlFor="image" className="flex flex-col items-center cursor-pointer group">
            <div className="flex items-center justify-center rounded-full bg-violet-700 h-10 w-10 text-white transform group-hover:scale-110 transition-transform duration-200">
                <FaImages size={18} />
            </div>
            <p className="text-slate-700 font-medium">Image</p>
        </label>
        <label htmlFor="video" className="flex flex-col items-center cursor-pointer group">
            <div className="flex items-center justify-center rounded-full bg-indigo-600 h-10 w-10 text-white transform group-hover:scale-110 transition-transform duration-200">
                <FaVideo size={18} />
            </div>
            <p className="text-slate-700 font-medium">Video</p>
        </label>
        <label htmlFor="document" className="flex flex-col items-center cursor-pointer group">
            <div className="flex items-center justify-center rounded-full bg-rose-700 h-10 w-10 text-white transform group-hover:scale-110 transition-transform duration-200">
                <IoDocumentText size={18} />
            </div>
            <p className="text-slate-700 font-medium">Document</p>
        </label>

        <input
            type="file"
            id="image"
            className="hidden"
            onChange={(e) => handleFilePreview(e)}
            accept="image/jpeg,image/jpg,image/png"
        />
        <input
            type="file"
            id="video"
            className="hidden"
            onChange={(e) => handleFilePreview(e)}
            accept="video/mp4,video/x-m4v,video/*,video/avi,video/mkv,video/webm,video/ogg"
        />
        <input
            type="file"
            id="document"
            className="hidden"
            onChange={(e) => handleFilePreview(e)}
            accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.odt,.ods,.odp"
        />
    </form>
</div>
  )
}

export default React.memo(OpenFiles);