
const Chat = () => {
    return (
        <div>
            <div className="flex items-center gap-2 hover:bg-zinc-700 rounded px-2 py-1 cursor-pointer">

                <div className="avatar online placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-16">
                        <span className="text-xl">AI</span>
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className=" font-bold text-white">Username</p>
                    </div>

                </div>

            </div>

            <div className="divider my-0 py-0 h-1"></div>

        </div>
    )

};

export default Chat;