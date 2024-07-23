import { useOutletContext, useLocation } from 'react-router-dom';
import ProfilePic from './ProfilePic';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

const ProfilePage = () => {
  const [bestFriends, setBestFriends] = useState([]);
  const [activeChatId, setActiveChatId, visibility] = useOutletContext();
  const { apiUrl } = useContext(AuthContext);
  const location = useLocation();
  const { member } = location.state || {};

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchBestFriends = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/users/${member._id}/friends/best`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        if (response.ok) {
          setBestFriends(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestFriends();
  }, [member]);

  return (
    <div
      className={`container row-start-1 flex max-w-screen-xl flex-col items-center justify-start pt-20 max-lg:col-start-1 max-lg:col-end-3 ${visibility ? 'col-start-2 col-end-3' : 'col-start-1 col-end-3'}`}
    >
      <div className="mb-16 flex items-center gap-12">
        <ProfilePic
          username={member.username}
          className="size-56 self-start bg-gray-200 text-9xl dark:bg-gray-900"
        />
        <div className="flex flex-col gap-8 self-end">
          <h1 className="text-primary text-8xl font-semibold">
            {member.username}
          </h1>
          <p className="text-secondary text-lg">{member.profile?.bio || ''}</p>
        </div>
      </div>
      <div>
        <h3 className="text-primary text-3xl">Best Friends</h3>
        <ol className="text-secondary">
          {bestFriends.map((friend, index) => {
            return (
              <li className="text-inherit" key={index}>
                {friend.friend.username}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default ProfilePage;
