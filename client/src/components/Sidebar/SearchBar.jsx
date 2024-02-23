import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';



const SearchBar = () => {
    return (
        <form className="flex items-center gap-2 mt-5 mx-5">
            <input type="text" placeholder="Search" className="input input-bordered rounded-full" />
            <button type="submit" className="btn btn-circle bg-blue-700 text-white hover:bg-zinc-600" >
            <FontAwesomeIcon icon={faMagnifyingGlass} className='w-5 h-5 outline-none' />

            </button>
        </form>

    )

};

export default SearchBar;