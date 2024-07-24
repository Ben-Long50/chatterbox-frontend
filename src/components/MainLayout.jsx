import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

const MainLayout = () => {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState('');
  const { apiUrl, currentUser } = useContext(AuthContext);
  const [visibility, setVisibility] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchChats = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/users/${currentUser._id}/chats`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        if (response.ok) {
          setChats(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchChats();
  }, [currentUser._id]);

  const handleVisibility = () => {
    setVisibility((prevVisibility) => !prevVisibility);
  };

  return (
    <div className="layout-cols grid grid-rows-1 bg-white dark:bg-gray-700">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        visibility={visibility}
        setVisibility={setVisibility}
        handleVisibility={handleVisibility}
      />
      <Outlet context={[activeChatId, setActiveChatId, visibility]} />
    </div>
  );
};

export default MainLayout;
