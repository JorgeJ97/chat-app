import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import useSendMessage from "../../../hooks/useSendMessage";
import { BsEmojiGrin } from "react-icons/bs";
import { GoPaperclip } from "react-icons/go";
import { errorNotification } from "../../../utils/notifications";
import validateFile from "../../../utils/validateFile";
import OpenFiles from "./OpenFiles";
import EmojiButton from "./EmojiButton";
import FilePreview from "./FilePreview";
import uploadFiles from "../../../utils/uploadFiles";


const MessageInput = () => {

    const [openEmoji, setOpenEmoji] = useState(false);
    const [messageInput, setMessageInput] = useState(
        {
            message: '',
            imageUrl: '',
            videoUrl: '',
            docUrl: ''
        });
    const { sendMessage } = useSendMessage();
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const [cursorPosition, setCursorPosition] = useState(null);
    const [openFilesUpload, setOpenFilesUpload] = useState(false);

    const [uploadFile, setUploadFile] = useState({
        image: '',
        video: '',
        document: ''
    })
    const [filePreview, setFilePreview] = useState({
        image: '',
        video: '',
        document: ''
    })
    const disableInput = filePreview?.image || filePreview?.video ? true : false;

    useEffect(() => {
        if (cursorPosition !== null) {
            inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
        }

    }, [cursorPosition])

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);
        const newMessage = {
            message: messageInput.message,
            imageUrl: '',
            videoUrl: '',
            docUrl: ''
        }

        if (uploadFile?.image) {
            let response = await uploadFiles(uploadFile?.image);
            if (response?.url) {
                newMessage.imageUrl = response?.url;
            }
        }

        if (uploadFile?.video) {
            let response = await uploadFiles(uploadFile?.video);
            if (response?.url) {
                newMessage.videoUrl = response?.url;
            }

        }

        if (!messageInput.message && !newMessage.imageUrl && !newMessage.videoUrl && !newMessage.docUrl) return;

        // Send message
        await sendMessage(newMessage);

        //Clear states
        setFilePreview({
            image: '',
            video: '',
            document: ''
        })

        setUploadFile({
            image: '',
            video: '',
            document: ''
        })

        setMessageInput({
            message: '',
            imageUrl: '',
            videoUrl: '',
            docUrl: ''
        });
        setOpenEmoji(false);
        setLoading(false);
    }
    // Open emojipicker
    const handleOpenEmoji = () => {
        inputRef.current.focus();
        setOpenEmoji(!openEmoji);
        setOpenFilesUpload(false);
    }
    // Handle emoji click and set cursor position
    const handleEmojiClick = useCallback((e) => {
        const ref = inputRef.current;
        ref.focus();
        setMessageInput((prev) => {
            setCursorPosition(prev.message.substring(0, ref.selectionStart).length + e.emoji.length);
            return {
                ...prev,
                message: prev.message.substring(0, ref.selectionStart) + e.emoji + prev.message.substring(ref.selectionStart)
            }
        });
    }, [])

    // Set file preview before sending message
    const handleFilePreview = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        const type = e.target.id;
        const file = e.target.files[0];
        const validation = validateFile(file, type);

        if (!validation.valid) {
            return errorNotification(validation.message);
        }

        setUploadFile(
            {
                [type]: file
            });
        const reader = new FileReader()
        reader.onloadend = () => {
            setFilePreview((prev) => {
                return {
                    ...prev,
                    [type]: reader.result
                }
            })
        }
        reader.readAsDataURL(file);

        setOpenFilesUpload(false);
    }, [])

    const handleClosePreview = useCallback(() => {
        setFilePreview({
            image: '',
            video: '',
            document: ''
        })

        setUploadFile({
            image: '',
            video: '',
            document: ''
        })
    }, [])

    const handleOnChange = useCallback((e) => {
        const { selectionStart, value } = e.target;
        setMessageInput((prev) => ({
            ...prev,
            message: value
        }));
        setCursorPosition(selectionStart);
    }, [setMessageInput])

    //Show file icons
    const handleOpenFiles = () => {
        setOpenFilesUpload(!openFilesUpload);
        setOpenEmoji(false);

    }


    return (
        <>
            <section className="h-16 bg-slate-100 flex items-center px-2">
                <div className="relative flex">

                    {/* Emojis icon */}
                    <button className="text-slate-800 flex justify-center items-center w-10 h-10 rounded hover:bg-slate-300 hover:text-black"
                        type="button"
                        onClick={() => handleOpenEmoji()}
                    >
                        <BsEmojiGrin />
                    </button>

                    {/* Files icon */}
                    <button className="text-slate-800 flex justify-center items-center w-10 h-10 rounded hover:bg-slate-300 hover:text-black"
                        type="button" onClick={handleOpenFiles}>
                        <GoPaperclip />
                    </button>

                    {openFilesUpload && (
                        <OpenFiles handleFilePreview={handleFilePreview} />
                    )}

                </div>

                {/* Input message box */}
                <form className="w-full h-full flex items-center py-2" onSubmit={handleSubmit}>
                    <input
                        className={`w-full h-full rounded bg-white py-1 px-4 focus:outline-none text-slate-700 outline-none`}
                        type="text"
                        placeholder="Message"
                        value={messageInput.message}
                        ref={filePreview?.image || filePreview?.video ? null : inputRef}
                        onChange={(e) => handleOnChange(e)}
                        disabled={disableInput}
                    />
                    {
                        loading ?
                            (
                                <div className=" loading loading-spinner"></div>
                            ) : (
                                <button className="mx-2 text-slate-800  hover:text-blue-700">
                                    <LuSendHorizonal size={28} />
                                </button>

                            )
                    }

                </form>

            </section>


            {
                filePreview?.image &&

                <FilePreview
                    handleClosePreview={handleClosePreview}
                    handleOnChange={handleOnChange}
                    src={filePreview?.image}
                    value={messageInput.message}
                    inputRef={inputRef}
                    id={'image'}
                    handleOpenEmoji={handleOpenEmoji}
                    handleSubmit={handleSubmit}
                    loading={loading}
                />
            }
            {
                filePreview?.video &&
                <FilePreview
                    handleClosePreview={handleClosePreview}
                    handleOnChange={handleOnChange}
                    src={filePreview?.video}
                    value={messageInput.message}
                    inputRef={inputRef}
                    id={'video'}
                    handleOpenEmoji={handleOpenEmoji}
                    handleSubmit={handleSubmit}
                    loading={loading}
                />

            }
            {
                filePreview?.document && <div className="fixed w-full">
                    <img className="" src={filePreview.document} alt="document" />
                </div>
            }

            {openEmoji && (
                <EmojiButton
                    handleEmojiClick={handleEmojiClick}
                    setOpenEmoji={setOpenEmoji}
                    preview={filePreview?.image ? filePreview?.image : filePreview?.video ? filePreview?.video : filePreview?.document ? filePreview?.document : null}
                />

            )}

        </>
    )

};

export default MessageInput;