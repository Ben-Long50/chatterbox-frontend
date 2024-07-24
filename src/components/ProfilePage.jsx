import { useOutletContext, Link, useLocation } from 'react-router-dom';
import ProfilePic from './ProfilePic';
import InfoBox from './InfoBox';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './../custom-scrollbar.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from './AuthContext';

const ProfilePage = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [bestFriends, setBestFriends] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
  });
  const [activeChatId, setActiveChatId, visibility] = useOutletContext();
  const { apiUrl, currentUser } = useContext(AuthContext);

  const usernameInputRef = useRef(null);
  const bioInputRef = useRef(null);

  useEffect(() => {
    setEditMode(false);
    setLoading(true);
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const [bestFriendData, userData] = await Promise.all([
          fetchBestFriends(token),
          fetchUserInfo(token),
        ]);
        setBestFriends(bestFriendData);
        setUserInfo(userData);
        setFormData({ username: userData.username, bio: userData.profile.bio });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'username':
        setFormData((prevData) => ({
          ...prevData,
          username: value,
        }));
        break;
      case 'bio':
        setFormData((prevData) => ({
          ...prevData,
          bio: value,
        }));
        break;
      default:
        break;
    }
  };

  const fetchBestFriends = async (token) => {
    try {
      const response = await fetch(`${apiUrl}/users/${userId}/friends/best`, {
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

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch(`${apiUrl}/users/${userId}`, {
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

  const updateProfile = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${apiUrl}/users/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: formData.username,
          bio: formData.bio,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="text-primary">Loading...</div>;
  }

  return (
    <PerfectScrollbar
      options={{
        wheelSpeed: 1 / 2,
      }}
      className={`row-start-1 mx-auto mb-auto h-dvh w-full min-w-0 max-xl:col-start-1 max-xl:col-end-3 md:gap-y-16 ${visibility ? 'col-start-2 col-end-3' : 'col-start-1 col-end-3'}`}
    >
      <div className="grid max-w-screen-lg grid-cols-2 gap-x-12 gap-y-10 px-4 pb-4 pt-12 md:pt-20 lg:px-8 lg:pb-8">
        <div className="col-span-2 w-full items-center gap-12 justify-self-center md:flex-row">
          <div className="flex flex-col items-center justify-center gap-12 md:flex-row">
            <ProfilePic
              username={userInfo.username}
              className="block size-48 shrink-0 bg-gray-200 text-9xl md:float-left md:size-56 dark:bg-gray-900"
            />
            {!editMode ? (
              <h1 className="text-primary text-center text-6xl font-semibold md:text-8xl">
                {userInfo.username}
              </h1>
            ) : (
              <input
                ref={usernameInputRef}
                value={formData.username}
                name="username"
                onChange={handleChange}
                className="text-primary mx-0 my-2 w-full rounded-lg bg-gray-200 p-2 text-6xl md:text-8xl dark:bg-gray-800"
                type="text"
                placeholder="Enter username"
              />
            )}
          </div>
          {!editMode ? (
            <p className="text-secondary mx-6 mb-4 mt-12 text-center text-2xl md:mx-10">
              {userInfo.profile?.bio || ''}
            </p>
          ) : (
            <textarea
              ref={bioInputRef}
              value={formData.bio}
              name="bio"
              onChange={handleChange}
              className="text-primary mb-4 mt-12 h-44 w-full rounded-lg bg-gray-200 p-2 text-2xl dark:bg-gray-800"
              type="text"
              placeholder="Enter bio"
            />
          )}
        </div>

        <InfoBox
          className="col-span-2 mb-auto md:col-span-1"
          heading="Best Friends"
        >
          {bestFriends.map((friend, index) => {
            if (index < 5) {
              return (
                <>
                  <span>{`${index + 1}.`}</span>
                  <Link
                    className="list-secondary flex items-center gap-4 py-1 text-inherit hover:bg-gray-200 dark:hover:bg-gray-800"
                    to={`/users/${friend.friend.username}`}
                    state={{ userId: friend.friend._id }}
                  >
                    <ProfilePic
                      username={friend.friend.username}
                      className="my-0 ml-1 size-10 dark:bg-gray-700"
                    />
                    <p className="mr-auto text-lg" key={index}>
                      {friend.friend.username}
                    </p>
                    <span className="text-secondary ml-4 flex size-7 shrink-0 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700">
                      {friend.totalMessages}
                    </span>
                  </Link>
                </>
              );
            }
          })}
        </InfoBox>
        <InfoBox className="col-span-2 md:col-span-1" heading="Friends">
          {userInfo.friends.map((friend, index) => {
            return (
              <>
                <Link
                  key={index}
                  className="list-secondary flex items-center gap-4 py-1 text-inherit hover:bg-gray-200 dark:hover:bg-gray-800"
                  to={`/users/${friend.username}`}
                  state={{ userId: friend._id }}
                >
                  <ProfilePic
                    username={friend.username}
                    className="my-0 ml-1 size-10 dark:bg-gray-700"
                  />
                  <p className="flex-grow text-lg" key={index}>
                    {friend.username}
                  </p>
                </Link>
              </>
            );
          })}
        </InfoBox>
        <InfoBox className="col-span-2" heading="Statistics">
          <div className="flex w-full justify-between px-4 py-1">
            <p>Total messages sent</p>
            <span>{userInfo.messages.length}</span>
          </div>
          <div className="flex w-full justify-between px-4 py-1">
            <p>Total chats active in</p>
            <span>{userInfo.chats.length}</span>
          </div>
          <div className="flex w-full justify-between px-4 py-1">
            <p>Total number of friends</p>
            <span>{userInfo.friends.length}</span>
          </div>
        </InfoBox>
        {currentUser._id === userInfo._id && (
          <div className="col-span-2 flex justify-between">
            {!editMode ? (
              <>
                <button
                  className="accent-primary rounded p-2 hover:scale-105"
                  onClick={handleEdit}
                >
                  Edit account
                </button>
                <button className="accent-primary rounded p-2 hover:scale-105 hover:bg-red-500">
                  Delete account
                </button>
              </>
            ) : (
              <>
                <button
                  className="accent-primary rounded p-2 hover:scale-105"
                  onClick={() => {
                    handleEdit();
                    updateProfile();
                  }}
                >
                  Submit changes
                </button>
                <button
                  className="accent-primary rounded p-2 hover:scale-105 hover:bg-red-500"
                  onClick={handleEdit}
                >
                  Cancel changes
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <div className="mb-auto"></div>
    </PerfectScrollbar>
  );
};

export default ProfilePage;
