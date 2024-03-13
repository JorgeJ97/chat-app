// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import useChatContext from '../../hooks/useChatContext';



const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');
    const {chatUsers, setChatUsers, allChatUsers} = useChatContext();
    const debounceSearchValue = useDebounce(searchValue);

    useEffect(() => {
        if(debounceSearchValue === '') setChatUsers(allChatUsers);
        else{
            const filterChatUsers = chatUsers.filter(chatUser => chatUser.fullName.toLowerCase().includes(debounceSearchValue.toLowerCase()))
            setChatUsers(filterChatUsers)
        }

    }, [debounceSearchValue])

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }
    return (
        <form className="flex items-center gap-2 mt-5 mx-5">
            <input className="input input-bordered rounded-full"
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => handleChange(e)}
            />

            {/* <button type="submit" className="btn btn-circle bg-blue-700 text-white hover:bg-zinc-600" >
                <FontAwesomeIcon icon={faMagnifyingGlass} className='w-5 h-5 outline-none' />
            </button> */}

        </form>

    )

};

export default SearchBar;