import { useEffect, useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import useChatContext from '../../../hooks/useChatContext';
import { IoSearchOutline } from "react-icons/io5";
import useGetUsers from '../../../hooks/useGetUsers';
import UserCard from './UserCard/UserCard';
import { IoCloseOutline } from "react-icons/io5";



const SearchBar = ({ onClose }) => {
    const [searchValue, setSearchValue] = useState('');
    const { chatUsers } = useChatContext();
    const { loading, searchUsers } = useGetUsers();
    const debounceSearchValue = useDebounce(searchValue);

    useEffect(() => {
        handleSearch();


    }, [debounceSearchValue])

    const handleSearch = async () => {
        await searchUsers(debounceSearchValue);

    }


    return (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-40 p-2 z-10'>
            <div className='w-full max-w-lg mx-auto mt-10'>
                <div className='h-14 flex rounded overflow-hidden bg-white'>
                    <input type="text"
                        placeholder='Search users'
                        className='w-full outline-none py-2 h-full px-4 bg-white'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <div className='w-14 h-14 flex justify-center items-center text-slate-700'>
                        <IoSearchOutline size={20} />
                    </div>
                </div>

                <div className='bg-white w-full mt-2 p-4 rounded overflow-auto h-full'>
                    {
                        chatUsers?.length === 0 && !loading &&
                        <p className='text-center text-slate-700'>
                            No users found
                        </p>
                    }

                    {
                        loading &&
                        <div className='flex justify-center'>
                            <span className='loading loading-spinner bg-blue-700'></span>
                        </div>
                    }

                    {
                        chatUsers?.length !== 0 && !loading && (
                            chatUsers?.map((user) => {
                                return (
                                    <UserCard
                                        key={user._id}
                                        user={user}
                                        onClose={onClose}
                                    />
                                )

                            })
                        )
                    }

                </div>

            </div>
            <div className='absolute right-0 top-0 text-black text-2xl lg:text-4xl p-2' onClick={onClose}>
                <button>
                    <IoCloseOutline />
                </button>
            </div>
        </div>

    )

};

export default SearchBar;