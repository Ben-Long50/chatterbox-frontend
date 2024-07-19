import UserInfo from './UserInfo';
import List from './List';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import Icon from '@mdi/react';
import { mdiChevronLeft } from '@mdi/js';
import { AuthContext } from './AuthContext';

const Sidebar = (props) => {
  const [activeItem, setActiveItem] = useState('global');
  const [visibility, setVisibility] = useState(true);
  const { apiUrl, signout } = useContext(AuthContext);

  const handleClick = (e, id) => {
    setActiveItem(e.currentTarget);
    props.setActiveChatId(id);
    console.log(props.activeChatId);
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
              to="global"
              className={`list-primary ${activeItem === 'global' ? 'accent-primary' : ''}`}
              onClick={() =>
                handleClick({ currentTarget: 'global' }, props.chats[0]._id)
              }
            >
              Global Chat
            </Link>
          </li>
          <hr className="my-2 border-t border-gray-400 dark:border-gray-500" />
          <li>
            <List heading="Private Chats">
              {props.chats.map((chat) => {
                if (chat.name !== 'global') {
                  return (
                    <Link
                      to={`/chats/${chat.name}`}
                      key={chat.name}
                      id={chat._id}
                      className={`list-secondary ${activeItem === chat.name && 'accent-primary'}`}
                      onClick={() =>
                        handleClick({ currentTarget: chat.name }, chat._id)
                      }
                    >
                      {chat.name}
                    </Link>
                  );
                }
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
              <form action="/signin" onSubmit={signout}>
                <button className="list-secondary" type="submit">
                  Sign out
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
