import UserInfo from './UserInfo';
import List from './List';
import ChatList from './ChatList';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import Icon from '@mdi/react';
import { mdiChevronLeft } from '@mdi/js';
import { AuthContext } from './AuthContext';
import FriendList from './FriendList';
import MemberList from './MemberList';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Sidebar = (props) => {
  const [activeItem, setActiveItem] = useState('global');
  const { signout } = useContext(AuthContext);

  const handleClick = (e) => {
    setActiveItem(e.currentTarget);
  };

  const handleChatId = (id) => {
    props.setActiveChatId(id);
    console.log(props.activeChatId);
  };

  return (
    <div
      className={`z-10 col-end-2 row-start-1 flex h-dvh min-w-0 flex-col justify-between bg-gray-100 transition duration-300 max-sm:col-start-1 max-sm:col-end-3 dark:bg-gray-900 ${!props.visibility && '-translate-x-full'} sticky top-0`}
    >
      <button
        className={`accent-primary absolute right-4 top-4 z-20 grid shrink-0 place-content-center rounded-full hover:scale-110 ${!props.visibility && 'translate-x-180'}`}
        onClick={props.handleVisibility}
      >
        <Icon
          path={mdiChevronLeft}
          size={1.75}
          className={`text-inherit transition duration-300 ${!props.visibility && 'rotate-180'}`}
        ></Icon>
      </button>
      <PerfectScrollbar
        className="overflow-y-auto px-4 py-6"
        style={{ maxHeight: '100%' }}
      >
        <div className="mb-5 flex items-center justify-between pl-2">
          <h1 className="text-primary place-content-center text-3xl font-semibold">
            Chatterbox
          </h1>
        </div>
        <ul>
          <li>
            <Link
              to="chats/global"
              className={`list-primary ${activeItem === 'global' ? 'accent-primary' : ''}`}
              onClick={() => {
                handleClick({ currentTarget: 'global' });
                handleChatId(props.chats[0]._id);
              }}
            >
              Global Chat
            </Link>
          </li>
          <hr className="my-2 border-t border-gray-400 dark:border-gray-500" />
          <li>
            <ChatList
              activeItem={activeItem}
              chats={props.chats}
              handleClick={handleClick}
              handleChatId={handleChatId}
            />
          </li>
          <hr className="my-2 border-t border-gray-400 dark:border-gray-500" />
          <li>
            <FriendList
              activeChatId={props.activeChatId}
              activeItem={activeItem}
              handleClick={handleClick}
            />
          </li>
          <hr className="my-2 border-t border-gray-400 dark:border-gray-500" />
          <li>
            <MemberList activeItem={activeItem} handleClick={handleClick} />
          </li>
          <hr className="my-2 border-t border-gray-400 dark:border-gray-500" />
          <li>
            <List heading="Account">
              <Link
                className={`list-secondary flex-grow p-3 ${activeItem === 'details' && 'accent-primary'}`}
                onClick={() => handleClick({ currentTarget: 'details' })}
              >
                Details
              </Link>
              <Link
                className={`list-secondary flex-grow p-3 ${activeItem === 'security' && 'accent-primary'}`}
                onClick={() => handleClick({ currentTarget: 'security' })}
              >
                Security
              </Link>
              <form action="/signin" onSubmit={signout}>
                <button className="list-secondary flex-grow p-3" type="submit">
                  Sign out
                </button>
              </form>
            </List>
          </li>
        </ul>
      </PerfectScrollbar>
      <UserInfo />
    </div>
  );
};

export default Sidebar;
