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
import Button from './Button';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import NavButton from './NavButton';
import ScrollBar from 'react-perfect-scrollbar';

const Sidebar = (props) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [activeTab, setActiveTab] = useState('chats');
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
      className={`bg-primary relative z-10 col-end-2 row-start-1 flex h-dvh min-w-0 flex-col transition duration-300 max-sm:col-start-1 max-sm:col-end-3 ${!props.visibility && '-translate-x-full'} sticky top-0 overflow-y-hidden`}
    >
      <div className="relative flex items-center justify-between py-4 pl-4">
        <h1 className="text-primary place-content-center text-3xl font-semibold">
          Chatterbox
        </h1>
        <button
          className={`accent-primary absolute right-4 top-1/2 z-20 grid shrink-0 -translate-y-1/2 place-content-center rounded-full border-b hover:scale-110 ${!props.visibility && 'translate-x-180'}`}
          onClick={props.handleVisibility}
        >
          <Icon
            path={mdiChevronLeft}
            className={`size-10 text-inherit transition duration-300 ${!props.visibility && 'rotate-180'}`}
          ></Icon>
        </button>
      </div>
      <nav className="bg-primary mb-2 grid grid-cols-3 grid-rows-1 border-y p-2">
        <NavButton activeTab={activeTab} onClick={() => setActiveTab('chats')}>
          Chats
        </NavButton>
        <NavButton
          activeTab={activeTab}
          onClick={() => setActiveTab('friends')}
        >
          Friends
        </NavButton>
        <NavButton
          activeTab={activeTab}
          onClick={() => setActiveTab('members')}
        >
          Members
        </NavButton>
      </nav>
      {activeTab === 'chats' && (
        <>
          <Link
            to="chats/global"
            className={`list-primary mx-4 my-2 ${props.activeId === props.chats[0]?._id ? 'accent-primary' : ''} text-lg font-semibold`}
            onClick={() => {
              handleId(props.chats[0]._id);
              hideSidebar();
            }}
          >
            Global Chat
          </Link>
          <hr className="mx-4 my-2 border-t border-gray-400 dark:border-gray-500" />
          <ChatList
            activeId={props.activeId}
            chats={props.chats}
            setChats={props.setChats}
            handleId={handleId}
            hideSidebar={hideSidebar}
          />
        </>
      )}
      {activeTab === 'friends' && (
        <FriendList
          activeId={props.activeId}
          chats={props.chats}
          setChats={props.setChats}
          handleId={handleId}
          hideSidebar={hideSidebar}
        />
      )}
      {activeTab === 'memebers' && (
        <MemberList
          activeId={props.activeId}
          handleId={handleId}
          hideSidebar={hideSidebar}
        />
      )}
      <List className="p-4" heading="Account">
        <Link
          className={`list-secondary p-3 ${props.activeId === currentUser._id && 'accent-primary'}`}
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
            path={props.theme === 'light' ? mdiWeatherSunny : mdiWeatherNight}
            size={1.2}
          />
        </button>
        <form action="/signin" onSubmit={signout}>
          <button className="list-secondary flex-grow p-3" type="submit">
            Sign out
          </button>
        </form>
      </List>
      <UserInfo handleId={handleId} hideSidebar={hideSidebar} />
    </div>
  );
};

export default Sidebar;
