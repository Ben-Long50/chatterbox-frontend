import { useOutletContext, useLocation, Link } from 'react-router-dom';
import ProfilePic from './ProfilePic';
import InfoBox from './InfoBox';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

const ProfilePage = () => {
  const [bestFriends, setBestFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  const [activeChatId, setActiveChatId, visibility] = useOutletContext();
  const { apiUrl } = useContext(AuthContext);
  const location = useLocation();
  const { member } = location.state || {};

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const [bestFriendData, friendData] = await Promise.all([
          fetchBestFriends(token),
          fetchFriends(token),
        ]);
        setBestFriends(bestFriendData);
        setFriends(friendData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [member]);

  const fetchBestFriends = async (token) => {
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
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFriends = async (token) => {
    try {
      const response = await fetch(`${apiUrl}/users/${member._id}/friends`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`row-start-1 mx-auto mb-auto grid max-w-screen-xl grid-cols-2 gap-x-12 gap-y-12 px-4 pt-12 max-lg:col-start-1 max-lg:col-end-3 md:gap-y-20 md:pt-20 lg:px-8 ${visibility ? 'col-start-2 col-end-3' : 'col-start-1 col-end-3'}`}
    >
      <div className="col-span-2 flex flex-col items-center gap-12 justify-self-center md:flex-row">
        <ProfilePic
          username={member.username}
          className="size-48 bg-gray-200 text-9xl md:size-56 dark:bg-gray-900"
        />

        <h1 className="text-primary text-6xl font-semibold md:text-8xl">
          {member.username}
        </h1>
      </div>
      <p className="text-secondary col-span-2 text-xl">
        {member.profile?.bio || ''}
      </p>
      <InfoBox className="col-span-2 md:col-span-1" heading="Best Friends">
        {bestFriends.map((friend, index) => {
          if (index < 5) {
            return (
              <>
                <span>{`${index + 1}.`}</span>
                <Link
                  className="list-secondary flex items-center gap-4 py-1 text-inherit"
                  to={`/users/${friend.friend.username}`}
                  state={{ member: friend.friend }}
                >
                  <ProfilePic
                    username={friend.friend.username}
                    className="my-0 ml-1 size-10 dark:bg-gray-900"
                  />
                  <p key={index}>{friend.friend.username}</p>
                </Link>
              </>
            );
          }
        })}
      </InfoBox>
      <InfoBox className="col-span-2 md:col-span-1" heading="Friends">
        {friends.map((friend, index) => {
          return (
            <Link
              key={index}
              className="list-secondary flex items-center gap-4 py-1 text-inherit"
              to={`/users/${friend.username}`}
              state={{ member: friend }}
            >
              <ProfilePic
                username={friend.username}
                className="my-0 ml-1 size-10 dark:bg-gray-900"
              />
              <p className="flex-grow" key={index}>
                {friend.username}
              </p>
            </Link>
          );
        })}
      </InfoBox>
    </div>
  );
};

export default ProfilePage;
