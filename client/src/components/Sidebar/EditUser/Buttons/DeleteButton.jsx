import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteButton = ({ onClick }) => (
    <div className=' hover:bg-zinc-600 cursor-pointer w-10 h-10 rounded flex justify-center items-center' onClick={onClick} title="Delete current image" type="button">
        <button className="font-semibold" type="button" title="Delete current image">
            <RiDeleteBin6Line size={20} />
        </button>
    </div>
);

export default React.memo(DeleteButton);