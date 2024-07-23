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
    const fetchData = async () => {
      try {
        const [chatsData] = await Promise.all([
          fetchChats(token, currentUser._id),
        ]);

        if (chatsData.length > 0) {
          setChats(chatsData);
          setActiveChatId(chatsData[0]._id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentUser._id]);

  const handleVisibility = () => {
    setVisibility((prevVisibility) => !prevVisibility);
  };

  const fetchChats = async (token, userId) => {
    try {
      const response = await fetch(`${apiUrl}/users/${userId}/chats`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
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
