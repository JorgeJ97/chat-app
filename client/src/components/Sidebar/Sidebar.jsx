import ChatsContainer from "./ChatsContainer";
import LogoutButton from "./LogoutButton";
import SearchBar from "./SearchBar";


const Sidebar = () => {
    return (
        <div className="border-r flex flex-col p-4">
            <SearchBar/>
            <div className="divider px-3 h-1 py-0"/>
            <ChatsContainer/>
            <LogoutButton/>
        </div>
    )

};

export default Sidebar;