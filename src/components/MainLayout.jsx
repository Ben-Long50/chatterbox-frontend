import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

const MainLayout = () => {
  const [chats, setChats] = useState([]);
  const [friends, setFriends] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const { apiUrl, userId } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const [chatsData, freindsData] = await Promise.all([
          fetchChats(token, userId),
          fetchFriends(token, userId),
        ]);

        if (chatsData.length > 0) {
          setChats(chatsData);
          setActiveChatId(chatsData[0]._id);
        }
        if (freindsData.length > 0) {
          setFriends(freindsData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId]);

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

  const fetchFriends = async (token, userId) => {
    try {
      const response = await fetch(`${apiUrl}/users/${userId}/friends`, {
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
    <div className="flex bg-white dark:bg-gray-700">
      <Sidebar
        chats={chats}
        friends={friends}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
      />
      <Outlet context={[activeChatId, setActiveChatId]} />
    </div>
  );
};

export default MainLayout;
