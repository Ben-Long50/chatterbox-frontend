import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Link } from 'react-router-dom';

const UserInfo = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Link to={`/users/${currentUser.username}`} state={{ member: currentUser }}>
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-400 bg-inherit dark:border-gray-500">
        <div className="flex items-center justify-between gap-2 p-4">
          <div className="text-primary flex size-12 items-center justify-center rounded-full bg-gray-300 object-cover text-center text-3xl dark:bg-gray-700">
            <p>
              {currentUser.username
                ? currentUser.username[0].toUpperCase()
                : ''}
            </p>
          </div>
          <div className="text-xs">
            <strong className="text-primary block text-xl font-medium">
              {currentUser.username}
            </strong>
            <p className="text-secondary text-right text-base">status</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserInfo;
