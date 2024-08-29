import React, { useCallback } from 'react';
import Avatar from '../../../Avatar/Avatar';
import { Link } from 'react-router-dom';
import useChatContext from '../../../../hooks/useChatContext';

const UserCard = ({ user, onClose }) => {
  const { setSelectedChat } = useChatContext();

  const handleClick = useCallback(() => {
    setSelectedChat(user);
    onClose();
  }, [setSelectedChat, user, onClose]);

  return (
    <Link 
      to={`/${user?._id}`} 
      onClick={handleClick} 
      className='flex items-center cursor-pointer gap-3 p-2 lg:p-4 border border-transparent border-b-slate-200 hover:bg-gray-200 rounded'>
      <div>
        <Avatar image={user?.image} fullName={user?.fullName} id={user?._id}/>
      </div>
      <div>
        <div className='font-semibold text-slate-700 text-ellipsis line-clamp-1'>
          {user?.fullName}
        </div>
        <p className='text-sm text-slate-600 text-ellipsis line-clamp-1'>{user?.email}</p>
      </div>
    </Link>
  );
};

export default React.memo(UserCard);
