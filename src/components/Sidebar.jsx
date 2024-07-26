import UserInfo from './UserInfo';
import List from './List';
import ChatList from './ChatList';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import { AuthContext } from './AuthContext';
import FriendList from './FriendList';
import MemberList from './MemberList';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Sidebar = (props) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { signout, currentUser } = useContext(AuthContext);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const hideSidebar = () => {
    if (windowSize.width < 1024) {
      props.setVisibility(false);
    }
  };

  const handleId = (id) => {
    props.setActiveId(id);
    localStorage.setItem('activeId', id);
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
        options={{
          wheelSpeed: 1 / 2,
        }}
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
              className={`list-primary ${props.activeId === props.chats[0]._id ? 'accent-primary' : ''}`}
              onClick={() => {
                handleId(props.chats[0]._id);
                hideSidebar();
              }}
            >
              Global Chat
            </Link>
          </li>
          <hr className="my-2 border-t border-gray-400 dark:border-gray-500" />
          <li>
            <ChatList
              activeId={props.activeId}
              chats={props.chats}
              handleId={handleId}
              hideSidebar={hideSidebar}
            />
          </li>
          <hr className="my-2 border-t border-gray-400 dark:border-gray-500" />
          <li>
            <FriendList
              activeId={props.activeId}
              handleId={handleId}
              hideSidebar={hideSidebar}
            />
          </li>
          <hr className="my-2 border-t border-gray-400 dark:border-gray-500" />
          <li>
            <MemberList activeId={props.activeId} handleId={handleId} />
          </li>
          <hr className="my-2 border-t border-gray-400 dark:border-gray-500" />
          <li>
            <List heading="Account">
              <Link
                className={`list-secondary flex-grow p-3 ${props.activeId === currentUser._id && 'accent-primary'}`}
                to={`/users/${currentUser.username}`}
                state={{ userId: currentUser._id }}
                onClick={() => {
                  handleId(currentUser._id);
                  hideSidebar();
                }}
              >
                Details
              </Link>
              <button
                className="list-secondary flex items-center gap-4 p-3"
                onClick={props.changeTheme}
              >
                <p>Change theme</p>
                <Icon
                  path={
                    props.theme === 'dark' ? mdiWeatherSunny : mdiWeatherNight
                  }
                  size={1.2}
                />
              </button>
              <form action="/signin" onSubmit={signout}>
                <button className="list-secondary flex-grow p-3" type="submit">
                  Sign out
                </button>
              </form>
            </List>
          </li>
        </ul>
      </PerfectScrollbar>
      <UserInfo handleId={handleId} hideSidebar={hideSidebar} />
    </div>
  );
};

export default Sidebar;
