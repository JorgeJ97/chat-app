import useAuth from "../../hooks/useAuth";
import useChatContext from "../../hooks/useChatContext";
import getInitials from "../../utils/getInitials";



const Message = ({ message }) => {
    const { selectedChat } = useChatContext();
    const { user } = useAuth();
    const toInitials = getInitials(selectedChat.fullName);
    const userInitials = getInitials(user.fullName);
    let isReceiver = user.id === message.receiverId;
    const time = getTime(message.createdAt)
    const shake = message.shake ? "shake" : "";

    let initials = isReceiver ? toInitials : userInitials;

    if (selectedChat?._id === message.senderId || user.id === message.senderId ) {

        return (
            <div className={`chat py-2.5 ${!isReceiver ? "chat-end" : "chat-start"}`}>
                <div className="chat-image avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                        <span className="text-sm">{initials}</span>
                    </div>
                </div>

                <div className={`chat-bubble text-white ${shake} ${!isReceiver ? "bg-blue-500" : "bg-zinc-800"}`}>
                    {message.message}
                </div>
                <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{time}</div>
            </div>
        )
    }


};

export default Message;


function getTime(dateString) {
    const date = new Date(dateString);

    const hour = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());

    return `${hour}:${minutes}`;

}
function padZero(number) {
    return number.toString().padStart(2, "0");
}