import MessagesContainer from "../../components/Messages/MessagesContainer.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import listenSocket from "../../utils/listenSocket.js";


const Home = () => {
    listenSocket();

    return (
        <div>

            <h1 className="text-center font-bold text-3xl py-4 text-white">Chat App</h1>

            <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-clip-padding  bg-zinc-900">
                <Sidebar />
                <MessagesContainer />
            </div>

        </div>

    )

};

export default Home;