import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Link } from 'react-router-dom';

const UserInfo = (props) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Link
      className="transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-800"
      to={`/users/${currentUser.username}`}
      state={{ userId: currentUser._id }}
      onClick={() => {
        props.handleId(currentUser._id);
        props.hideSidebar();
      }}
    >
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-400 bg-inherit dark:border-gray-500">
        <div className="flex items-center justify-between gap-2 p-4">
          <div className="text-primary flex size-14 items-center justify-center rounded-full bg-gray-300 object-cover text-center text-4xl dark:bg-gray-700">
            <p>
              {currentUser.username
                ? currentUser.username[0].toUpperCase()
                : ''}
            </p>
          </div>
          <div className="text-xs">
            <strong className="text-primary block text-3xl font-medium">
              {currentUser.username}
            </strong>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserInfo;
