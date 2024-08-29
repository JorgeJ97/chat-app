import React from "react";
import { MdOutlineModeEdit } from "react-icons/md";

const EditButton = ({ onClick }) => (
    <button className='text-white flex justify-center items-center rounded w-10 h-10 cursor-pointer hover:bg-zinc-600' type="button" onClick={onClick}>
        <MdOutlineModeEdit className="w-4 h-4" />
    </button>
);

export default React.memo(EditButton);