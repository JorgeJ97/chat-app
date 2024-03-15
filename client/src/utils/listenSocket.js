import { useEffect } from "react";
import useChatContext from "../hooks/useChatContext";
import sound from '../assets/sounds/campana.mp3';
import { useSocket } from "../context/SocketContext";



const listenSocket = () => {
    const { messages, setMessages } = useChatContext();
    const {socket} = useSocket();


    useEffect(() => {

        socket?.on("new_message",  (newMessage) => {
            newMessage.shake = true;
            const notification = new Audio(sound);
            notification.play();
            setMessages([...messages, newMessage]);
            console.log("message", newMessage)
        })
        return () => socket?.off("new_message");
    


    },[socket, messages, setMessages])
}

export default listenSocket;