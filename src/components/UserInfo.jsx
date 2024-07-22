import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const UserInfo = () => {
  const { username } = useContext(AuthContext);
  return (
    <div className="sticky inset-x-0 bottom-0 border-t border-gray-400 bg-inherit dark:border-gray-500">
      <div className="flex items-center justify-between gap-2 p-4">
        <div className="text-primary flex size-12 items-center justify-center rounded-full bg-gray-300 object-cover text-center text-3xl dark:bg-gray-700">
          <p>{username ? username[0].toUpperCase() : ''}</p>
        </div>
        <div className="text-xs">
          <strong className="text-primary block text-xl font-medium">
            {username}
          </strong>
          <p className="text-secondary text-right text-base">status</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
