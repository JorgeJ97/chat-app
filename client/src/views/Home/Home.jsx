import MessagesContainer from "../../components/Messages/MessagesContainer.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { useLocation, Route, Routes } from "react-router-dom"
import logo from '../../assets/logo.png';
import useGetCoversations from "../../hooks/useGetConversations.js";
import { useEffect } from "react";
import useListenSocket from "../../hooks/useListenSocket.js";


const Home = () => {
    
    
    const { getConversations} = useGetCoversations();
    useEffect(() => {
        getConversations();
    }, []);
    
    useListenSocket();

    const location = useLocation();
    const isHomePath = location.pathname === '/';

    return (
        <div className="grid lg:grid-cols-[300px,1fr] h-screen max-h-screen">
            <section className={`bg-white ${!isHomePath && "hidden"} lg:block`}>
                <Sidebar />
            </section>

            <section className={`${isHomePath && 'hidden'} bg-slate-100`}>
                <Routes>
                    <Route path="/:userId" element={<MessagesContainer />} />
                </Routes>
            </section>

            <div className={`hidden justify-center items-center flex-col gap-2 bg-slate-50 ${!isHomePath ? '' : 'lg:flex'}`}>
                <div>
                    <img src={logo} alt="logo" width={250} />
                </div>
                <p className=" text-slate-600 mt-2 text-lg"> Select a user to send message</p>
            </div>


        </div>

    )

};

export default Home;



// Home component(firts version)
{/* <h1 className="text-center font-bold text-3xl py-4 text-white">Chat App</h1>

<div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-clip-padding  bg-zinc-900">
    <Sidebar />
    <MessagesContainer />
</div> */}