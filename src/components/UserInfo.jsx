import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const UserInfo = () => {
  const { username } = useContext(AuthContext);
  return (
    <div className="sticky inset-x-0 bottom-0 border-t border-gray-400 bg-inherit dark:border-gray-500">
      <Link
        to="/account/details"
        className="flex items-center gap-2 p-4 hover:bg-gray-200 dark:hover:bg-gray-800"
      >
        <div className="text-primary flex size-12 items-center justify-center rounded-full bg-white object-cover text-center text-3xl dark:bg-gray-700">
          {/* <p>{username[0].toUpperCase()}</p> */}
        </div>
        <p className="text-xs">
          <strong className="text-primary block text-lg font-medium">
            {username}
          </strong>
        </p>
      </Link>
    </div>
  );
};

export default UserInfo;
