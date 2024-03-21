import { useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import useSendMessage from "../../hooks/useSendMessage";


const MessageInput = () => {
    const [messageinput, setMessageInput] = useState('');
    const { sendMessage, loading } = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!messageinput) return;
        await sendMessage(messageinput);
        setMessageInput('');
    }


    return (
        <form className='px-4 my-3' onSubmit={(e) => handleSubmit(e)}>
            <div className="relative flex">

                <input className="input input-bordered rounded-full w-[85%] py-2.5 px-10 text-white bg-gray-800 focus:border-gray-700 focus:ring-gray-500"
                    type="text"
                    placeholder="Message"
                    value={messageinput}
                    onChange={(e) => setMessageInput(e.target.value)}
                />
                <button type="submit" className="btn btn-circle absolute right-0 top-0 border bg-blue-700 hover:bg-zinc-600">
                    {loading ? <div className='loading loading-spinner'></div> : <LuSendHorizonal className="w-6 h-6 text-white" />}

                </button>
            </div>


        </form>
    )

};

export default MessageInput;