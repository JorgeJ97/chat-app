import { useEffect, useRef, useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import useSendMessage from "../../hooks/useSendMessage";
import EmojiPicker from 'emoji-picker-react';
import { BsEmojiGrin } from "react-icons/bs";


const MessageInput = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [messageInput, setMessageInput] = useState('');
    const { sendMessage, loading } = useSendMessage();
    const inputRef = useRef(null);
    const [cursorPosition, setCursorPosition] = useState();

    useEffect(() => {
        inputRef.current.selectionEnd = cursorPosition;

    }, [cursorPosition])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!messageInput) return;
        await sendMessage(messageInput);
        setMessageInput('');
        setIsOpen(false);
    }

    const handleOpenEmoji = () => {
        inputRef.current.focus();
        setIsOpen(!isOpen);
    }

    const handleEmojiClick = (e) => {
        const ref = inputRef.current;
        ref.focus();
        const start = messageInput.substring(0, ref.selectionStart);
        setMessageInput(prevMessageInput => prevMessageInput.substring(0, ref.selectionStart) + e.emoji + prevMessageInput.substring(ref.selectionStart));
        setCursorPosition(start.length + e.emoji.length);
    }


    return (

        <>
            {isOpen &&
                (<div>
                    <EmojiPicker
                        className=" mx-2"
                        height={"200px"}
                        width={"95%"}
                        autoFocusSearch={false}
                        searchDisabled={true}
                        open={isOpen}
                        emojiStyle="facebook"
                        theme="auto"
                        onEmojiClick={(e) => handleEmojiClick(e)}
                        previewConfig={{
                            showPreview: false
                        }
                        }
                    />

                </div>)}


            <form className='px-4 my-3' onSubmit={(e) => handleSubmit(e)}>
                <div className="relative">



                    <button
                        type="button"
                        className="absolute left-[15px] top-[15px]"
                        onClick={() => handleOpenEmoji()}>
                        <BsEmojiGrin className="w-[18px] h-[18px]" />
                    </button>


                    {

                        <input className="input input-bordered rounded-full w-[85%] py-2.5 px-10 text-white bg-gray-800 focus:border-gray-700 focus:ring-gray-500"
                            ref={inputRef}
                            type="text"
                            placeholder="Message"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                        />

                    }



                    <button type="submit" className="btn btn-circle absolute right-0 top-0 border bg-blue-700 hover:bg-zinc-600">
                        {loading ? <div className='loading loading-spinner'></div> : <LuSendHorizonal className="w-6 h-6 text-white" />}

                    </button>
                </div>


            </form>
        </>
    )

};

export default MessageInput;

