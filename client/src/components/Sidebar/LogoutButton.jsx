import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
    const {loading, logout} = useLogout()

    return (
        <div className="mt-auto">
            <BiLogOut  className="text-white h-6 w-6 cursor-pointer" onClick={logout}/>

        </div>
    )

};

export default LogoutButton;