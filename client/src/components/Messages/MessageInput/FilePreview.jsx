import React from 'react'
import { IoClose } from "react-icons/io5";
import { BsEmojiGrin } from 'react-icons/bs';
import { LuSendHorizonal } from "react-icons/lu";

const FilePreview = ({ handleClosePreview, value, src, inputRef, handleOnChange, id, handleOpenEmoji, handleSubmit, loading }) => {
  return (
    <div className="fixed bg-gray-900 bg-opacity-40 p-2 z-10 w-full h-full inset-0 flex items-center justify-center">

      <div className="flex flex-col justify-between inset-0 bg-white rounded relative w-[400px] h-[400px] pb-2">
        <div className="flex items-center h-8 bg-gray-500 rounded-t">
          <div className="absolute mr-2 right-0 text-slate-800 flex justify-center items-center rounded  hover:text-blue-700 cursor-pointer"
            onClick={handleClosePreview}>
            <IoClose size={24} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mx-2 flex-grow">
          {id === 'image' ? (
            <img className="aspect-square m-2 rounded object-scale-down" src={src} alt={id} width={300} height={300} />

          ) : id === 'video' ? (
            <video controls className="aspect-square m-2 rounded object-scale-down" src={src} alt={id} width={300} height={300} />
          ) : null}

          <section className='w-full h-8 bg-white flex items-center px-2'>
            <div>
              <button className="text-slate-800 flex justify-center items-center w-10 h-10 rounded hover:bg-slate-300 hover:text-black"
                type="button"
                onClick={() => handleOpenEmoji()}
              >
                <BsEmojiGrin />
              </button>
            </div>

            {/* Input message box */}
            <form className="w-full h-full flex items-center py-2" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Message"
                className="bg-white w-full h-8 py-2 px-4 text-slate-700 focus:outline-none outline-none"
                value={value}
                ref={src ? inputRef : null}
                onChange={(e) => handleOnChange(e)}
              />
              {
                loading ?
                  (
                    <div className=" loading loading-spinner"></div>
                  ) : (
                    <button className="mx-2 text-slate-800  hover:text-blue-700">
                      <LuSendHorizonal size={24} />
                    </button>

                  )
              }
            </form>

          </section>
        </div>
      </div>
    </div>
  )
}

export default React.memo(FilePreview);