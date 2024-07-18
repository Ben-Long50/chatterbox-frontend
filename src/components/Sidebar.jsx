import UserInfo from './UserInfo';
import List from './List';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiChevronLeft } from '@mdi/js';

const Sidebar = () => {
  const [chats, setChats] = useState(['The Gay Bois', 'The Not Gay Bois']);
  const [activeItem, setActiveItem] = useState('global');
  const [visibility, setVisibility] = useState(true);

  const handleClick = (e) => {
    setActiveItem(e.currentTarget);
  };

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  return (
    <div
      className={`flex h-screen max-w-md flex-grow flex-col justify-between border-e border-none bg-gray-100 transition duration-300 dark:bg-gray-900 ${!visibility && '-translate-x-full'} sticky top-0`}
    >
      <div className="px-4 py-6">
        <div className="mb-5 flex items-center justify-between pl-2">
          <h1 className="text-primary place-content-center text-3xl font-semibold">
            Chatterbox
          </h1>
          <span
            className={`accent-primary grid shrink-0 place-content-center rounded-full hover:scale-110 ${!visibility && 'translate-x-180'}`}
          >
            <Icon
              path={mdiChevronLeft}
              size={1.75}
              className={`text-inherit transition duration-300 ${!visibility && 'rotate-180'}`}
              onClick={handleVisibility}
            ></Icon>
          </span>
        </div>
        <ul>
          <li>
            <Link
              // to="chats/global"
              className={`list-primary ${activeItem === 'global' ? 'accent-primary' : ''}`}
              onClick={() => handleClick({ currentTarget: 'global' })}
            >
              Global Chat
            </Link>
          </li>
          <hr className="my-2 border-t border-gray-400 dark:border-gray-500" />
          <li>
            <List heading="Private Chats">
              {chats.map((chat, index) => {
                return (
                  <Link
                    // to="chats/:chatId"
                    key={index}
                    className={`list-secondary ${activeItem === chat && 'accent-primary'}`}
                    onClick={() => handleClick({ currentTarget: chat })}
                  >
                    {chat}
                  </Link>
                );
              })}
            </List>
          </li>
          <hr className="my-2 border-t border-gray-400 dark:border-gray-500" />
          <li>
            <List heading="Account">
              <Link
                // to="accout/details"
                className={`list-secondary ${activeItem === 'details' && 'accent-primary'}`}
                onClick={() => handleClick({ currentTarget: 'details' })}
              >
                Details
              </Link>
              <Link
                // to="account/security"
                className={`list-secondary ${activeItem === 'security' && 'accent-primary'}`}
                onClick={() => handleClick({ currentTarget: 'security' })}
              >
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
