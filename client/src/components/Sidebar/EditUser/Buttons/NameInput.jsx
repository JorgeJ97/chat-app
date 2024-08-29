import React from "react";

const NameInput = ({ value, onChange, onClick }) => (
    <label className="relative input input-bordered flex items-center gap-2 w-full h-10">
        <input className="grow"
            type="text"
            id='fullName'
            name='fullName'
            value={value}
            onChange={onChange}
        />
        <button
            onClick={onClick}
            type='button'
            className='absolute top-10 right-1 border border-black rounded py-[2px] px-2 bg-blue-700 hover:bg-blue-800 text-white'
        >
            Ready
        </button>
    </label>
);

export default React.memo(NameInput);