import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import Loading from './Loading';
import { ThemeContext } from './ThemeContext';
import useChatQuery from '../hooks/useChatQuery/useChatQuery';
import useGlobalChatQuery from '../hooks/useGlobalChatQuery/useGlobalChatQuery';

const MainLayout = () => {
  const [activeId, setActiveId] = useState('');
  const { apiUrl, currentUser } = useContext(AuthContext);
  const [visibility, setVisibility] = useState(true);
  const { theme, changeTheme } = useContext(ThemeContext);

  const globalChat = useGlobalChatQuery(apiUrl);
  const chats = useChatQuery(currentUser, apiUrl);

  useEffect(() => {
    setActiveId(globalChat.data?._id);
  }, [globalChat.data]);

  const handleVisibility = () => {
    setVisibility((prevVisibility) => !prevVisibility);
  };

  if (globalChat.isLoading || globalChat.isPending) {
    return <Loading />;
  }

  if (chats.isLoading || chats.isPending) {
    return <Loading />;
  }

  return (
    <div
      className={`${theme} layout-cols grid grid-rows-1 overflow-y-hidden bg-white dark:bg-gray-700`}
    >
      <Sidebar
        globalChat={globalChat.data}
        chats={chats.data}
        activeId={activeId}
        setActiveId={setActiveId}
        visibility={visibility}
        setVisibility={setVisibility}
        handleVisibility={handleVisibility}
        theme={theme}
        changeTheme={changeTheme}
      />
      <Outlet context={[activeId, setActiveId, visibility, chats]} />
    </div>
  );
};

export default MainLayout;
