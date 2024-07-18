import { Link } from 'react-router-dom';

const UserInfo = () => {
  return (
    <div className="sticky inset-x-0 bottom-0 border-t border-gray-400 bg-inherit dark:border-gray-500">
      <Link
        to="/account"
        className="flex items-center gap-2 p-4 hover:bg-gray-200 dark:hover:bg-gray-800"
      >
        <img
          alt=""
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          className="size-12 rounded-full object-cover"
        />

        <div>
          <p className="text-xs">
            <strong className="text-primary block text-lg font-medium">
              Ben Long
            </strong>

            <span className="text-secondary"> blong@gmail.com </span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default UserInfo;
