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
import NavButton from './NavButton';
import { LayoutContext } from './LayoutContext';

const Sidebar = (props) => {
  const { layoutSize } = useContext(LayoutContext);
  const [activeTab, setActiveTab] = useState('chats');
  const { signout, currentUser } = useContext(AuthContext);
  const [visibleMenuId, setVisibleMenuId] = useState(null);

  useEffect(() => {
    const menu = document.getElementById(`${visibleMenuId}`);
    const hideMenu = (e) => {
      if (e.target !== menu) {
        setVisibleMenuId(null);
      }
    };
    window.addEventListener('click', hideMenu);
    return () => {
      window.removeEventListener('click', hideMenu);
    };
  }, [visibleMenuId]);

  const hideSidebar = () => {
    if (layoutSize !== 'large') {
      props.setVisibility(false);
    }
  };

  const handleId = (id) => {
    props.setActiveId(id);
    localStorage.setItem('activeId', id);
  };

  return (
    <div
      className={`bg-primary relative z-10 row-start-1 flex h-dvh min-w-0 flex-col transition duration-300 ${layoutSize === 'xsmall' || layoutSize === 'small' ? 'col-start-1 col-end-3' : 'col-start-1 col-end-2'} ${!props.visibility && '-translate-x-full'} sticky top-0`}
    >
      <div className="relative flex items-center justify-between py-4 pl-4">
        <h1 className="text-primary place-content-center text-3xl font-semibold">
          Chatterbox
        </h1>
        <button
          className={`accent-primary absolute right-4 top-1/2 z-20 grid shrink-0 -translate-y-1/2 place-content-center rounded-full border-b lg:hover:scale-110 ${!props.visibility && 'visible translate-x-180'}`}
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
            className={`list-primary mx-4 my-2 ${props.activeId === props.globalChat?._id ? 'accent-primary' : ''} text-lg font-semibold`}
            onClick={() => {
              handleId(props.globalChat._id);
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
            visibleMenuId={visibleMenuId}
            setVisibleMenuId={setVisibleMenuId}
          />
        </>
      )}
      {activeTab === 'friends' && (
        <FriendList
          activeId={props.activeId}
          chats={props.chats}
          globalChat={props.globalChat}
          handleId={handleId}
          hideSidebar={hideSidebar}
          visibleMenuId={visibleMenuId}
          setVisibleMenuId={setVisibleMenuId}
        />
      )}
      {activeTab === 'members' && (
        <MemberList
          activeId={props.activeId}
          handleId={handleId}
          hideSidebar={hideSidebar}
          visibleMenuId={visibleMenuId}
          setVisibleMenuId={setVisibleMenuId}
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
