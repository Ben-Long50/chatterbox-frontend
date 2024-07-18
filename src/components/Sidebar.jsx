import UserInfo from './UserInfo';
import List from './List';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const globalRef = useRef(null);
  const primaryRef = useRef(null);

  const handleClick = (e) => {
    setActiveItem(e.target);
    console.log(activeItem);
  };

  return (
    <div className="flex h-screen max-w-md flex-col justify-between border-e border-none bg-gray-100 dark:bg-gray-900">
      <div className="px-4 py-6">
        <div className="mb-5 flex items-center justify-between pl-2">
          <h1 className="text-primary place-content-center text-3xl font-semibold">
            Chatterbox
          </h1>
          <span className="bg-g grid shrink-0 rotate-90 place-content-center rounded-full bg-yellow-200 transition duration-300 hover:scale-110 hover:bg-yellow-300 group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-secondary h-10 w-10"
              viewBox="0 0 20 20"
              fill="rgb(17 24 39)"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
        <ul>
          <li>
            <Link
              // to="chats/global"
              ref={globalRef}
              className={`list-primary ${activeItem === globalRef.current ? 'bg-yellow-200 text-gray-900 hover:bg-yellow-300' : ''}`}
              onClick={handleClick}
            >
              Global Chat
            </Link>
          </li>
          <hr className="my-2 border-t border-gray-400 dark:border-gray-500" />
          <li>
            <List heading="Private Conversations">
              <Link
                // to="chats/:chatId"
                ref={primaryRef}
                className={`list-secondary ${activeItem === primaryRef.current ? 'bg-yellow-200 text-gray-900 hover:bg-yellow-300' : ''}`}
                onClick={handleClick}
              >
                Primary Group Chat
              </Link>
              <Link to="chats/:chatId" className="list-secondary">
                Secondary Group Chat
              </Link>
            </List>
          </li>
          <hr className="my-2 border-t border-gray-400 dark:border-gray-500" />
          <li>
            <List heading="Account">
              <Link to="account/details" className="list-secondary">
                Details
              </Link>

              <Link to="account/security" className="list-secondary">
                Security
              </Link>

              <form action="/signin">
                <button className="list-secondary" type="submit">
                  Logout
                </button>
              </form>
            </List>
          </li>
        </ul>
      </div>
      <UserInfo />
    </div>
  );
};

export default Sidebar;
