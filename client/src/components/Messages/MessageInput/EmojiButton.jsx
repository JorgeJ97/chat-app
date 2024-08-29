import React from 'react'
import EmojiPicker from 'emoji-picker-react';
import { IoClose } from "react-icons/io5";


const EmojiButton = ({handleEmojiClick, setOpenEmoji, preview}) => {
  return (
    <div className={`absolute  right-auto flex justify-center items-center ${preview ? "w-full bottom-[108px] md:bottom-[120px] lg:bottom-[170px] " : "w-full lg:w-auto md:w-auto bottom-16" } z-[12]`}>
    <div className='relative'>

    <button
        className="absolute -top-2 -right-2 p-2 bg-gray-200 rounded-full text-black hover:bg-gray-300 z-50"
        onClick={() => setOpenEmoji(false)}
        aria-label="Close Emoji Picker"
    >
        <IoClose size={18} />
    </button>
    <EmojiPicker
        className={` mb-1 ${preview ? "w-full h-full max-w-[250px] max-h-[300px]" : "mb-1 lg:ml-3 md:ml-3 w-full h-full max-w-[250px] max-h-[350px] sm:max-w-[350px] sm:max-h-[350px] md:max-w-[350px] md:max-h-[350px] lg:max-w-[400px] lg:max-h-[400px]"} `}
        defaultSkinTone="neutral"
        autoFocusSearch={false}
        emojiStyle="facebook"
        theme="light"
        onEmojiClick={(e) => handleEmojiClick(e)}
        previewConfig={{
            showPreview: false
        }}
    />
    </div>
</div>
  )
}

export default React.memo(EmojiButton);
