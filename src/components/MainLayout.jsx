import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [activeId, setActiveId] = useState('');
  const { apiUrl, currentUser } = useContext(AuthContext);
  const [visibility, setVisibility] = useState(true);

  useEffect(() => {
    setLoading(true);
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
          setActiveId(data[0]._id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, [currentUser._id]);

  const handleVisibility = () => {
    setVisibility((prevVisibility) => !prevVisibility);
  };

  if (loading) {
    return <div className="text-primary">Loading...</div>;
  }

  return (
    <div className="layout-cols grid grid-rows-1 bg-white dark:bg-gray-700">
      <Sidebar
        chats={chats}
        activeId={activeId}
        setActiveId={setActiveId}
        visibility={visibility}
        setVisibility={setVisibility}
        handleVisibility={handleVisibility}
      />
      <Outlet context={[activeId, setActiveId, visibility]} />
    </div>
  );
};

export default MainLayout;
