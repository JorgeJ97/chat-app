import toast from "react-hot-toast";

const errorNotification = (string) => {
    return toast.error(string, {
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
        duration: 2000
    });

};

export default errorNotification;
