import MessagesContainer from "../../components/Messages/MessagesContainer.jsx";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";


const Home = () => {

    return (

        <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-clip-padding  bg-zinc-900">

            <Sidebar/>
            <MessagesContainer/>
           

        </div>

    )

};

export default Home;