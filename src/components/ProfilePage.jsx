import {
  useOutletContext,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import ProfilePic from './ProfilePic';
import InfoBox from './InfoBox';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './../custom-scrollbar.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from './AuthContext';
import Loading from './Loading';
import useBestFriendQuery from '../hooks/useBestFriendQuery/useBestFriendQuery';
import useUserInfoQuery from '../hooks/useUserInfoQuery/useUserInfoQuery';
import useDeleteProfileMutation from '../hooks/useDeleteProfileMutation/useDeleteProfileMutation';
import useUpdateProfileMutation from '../hooks/useUpdateProfileMutation/useUpdateProfileMutation';

const ProfilePage = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
  });
  const [activeId, setActiveId, visibility] = useOutletContext();
  const { apiUrl, currentUser, signout } = useContext(AuthContext);
  const navigate = useNavigate();

  const usernameInputRef = useRef(null);
  const bioInputRef = useRef(null);

  const bestFriends = useBestFriendQuery(userId, apiUrl);
  const userInfo = useUserInfoQuery(userId, apiUrl);

  const updateProfile = useUpdateProfileMutation(currentUser, apiUrl);
  const deleteProfile = useDeleteProfileMutation(currentUser, apiUrl, signout);

  useEffect(() => {
    setEditMode(false);
    setFormData({
      username: userInfo.data?.username,
      bio: userInfo.data?.profile?.bio,
    });
  }, [userId, userInfo.data]);

  const handleId = (id) => {
    setActiveId(id);
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

  if (bestFriends.isLoading || bestFriends.isPending) {
    return <Loading />;
  }

  if (userInfo.isLoading || userInfo.isPending) {
    return <Loading />;
  }

  return (
    <PerfectScrollbar
      className={`row-start-1 mx-auto mb-auto h-dvh w-full min-w-0 max-lg:col-start-1 max-lg:col-end-3 md:gap-y-16 ${visibility ? 'col-start-2 col-end-3' : 'col-start-1 col-end-3'}`}
    >
      <div className="mx-auto grid max-w-screen-lg grid-cols-2 gap-x-12 gap-y-10 px-4 pb-4 pt-12 lg:px-8 lg:pb-8 xl:pt-20">
        <div className="col-span-2 w-full gap-12 justify-self-center md:flex-row">
          <div className="flex flex-col items-center justify-center gap-12 xl:flex-row">
            <ProfilePic
              username={userInfo.data.username}
              className="block size-48 shrink-0 bg-gray-200 text-9xl md:float-left md:size-56 dark:bg-gray-900"
            />
            {!editMode ? (
              <h1 className="text-primary text-center text-6xl font-semibold md:text-8xl">
                {userInfo.data.username}
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
          <div className="flex justify-center">
            {!editMode ? (
              <p className="text-secondary mx-6 mb-4 mt-12 text-left text-2xl md:mx-10">
                {userInfo.data.profile?.bio || ''}
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
        </div>

        <InfoBox
          className="col-span-2 mb-auto md:col-span-1"
          heading="Best Friends"
        >
          {bestFriends?.data.map((friend, index) => {
            if (index < 5) {
              return (
                <>
                  <span>{`${index + 1}.`}</span>
                  <Link
                    className="list-secondary flex items-center gap-4 py-1 text-inherit hover:bg-gray-200 dark:hover:bg-gray-800"
                    to={`/users/${friend.friendName}`}
                    state={{ userId: friend.friendId }}
                    onClick={() => {
                      handleId(friend.friendId);
                    }}
                  >
                    <ProfilePic
                      username={friend.friendName}
                      className="my-0 ml-1 size-10 dark:bg-gray-700"
                    />
                    <p className="mr-auto text-lg" key={index}>
                      {friend.friendName}
                    </p>
                    <span className="text-secondary ml-4 flex size-7 shrink-0 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700">
                      {friend.count}
                    </span>
                  </Link>
                </>
              );
            }
          })}
        </InfoBox>
        <InfoBox className="col-span-2 md:col-span-1" heading="Friends">
          {userInfo.data.friends.map((friend, index) => {
            return (
              <>
                <Link
                  key={index}
                  className="list-secondary flex items-center gap-4 py-1 text-inherit hover:bg-gray-200 dark:hover:bg-gray-800"
                  to={`/users/${friend.username}`}
                  state={{ userId: friend._id }}
                  onClick={() => {
                    handleId(friend._id);
                  }}
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
            <span>{userInfo.data.messages.length}</span>
          </div>
          <div className="flex w-full justify-between px-4 py-1">
            <p>Total chats active in</p>
            <span>{userInfo.data.chats.length}</span>
          </div>
          <div className="flex w-full justify-between px-4 py-1">
            <p>Total number of friends</p>
            <span>{userInfo.data.friends.length}</span>
          </div>
        </InfoBox>
        {currentUser._id === userInfo.data._id && (
          <div
            className={`col-span-2 flex gap-8 ${!deleteMode && !editMode && 'justify-between'} ${deleteMode && 'justify-end'} ${editMode && 'justify-start'}`}
          >
            {!editMode && !deleteMode && (
              <>
                <button
                  className="accent-primary rounded p-2 hover:scale-105"
                  onClick={() => setEditMode(!editMode)}
                >
                  Edit account
                </button>
                <button
                  className="accent-primary rounded p-2 hover:scale-105 hover:bg-red-500"
                  onClick={() => setDeleteMode(!deleteMode)}
                >
                  Delete account
                </button>
              </>
            )}
            {editMode && (
              <>
                <button
                  className="accent-primary rounded p-2 hover:scale-105"
                  onClick={() => {
                    setEditMode(!editMode);
                    updateProfile.mutate(formData);
                  }}
                >
                  Submit changes
                </button>
                <button
                  className="accent-primary rounded p-2 hover:scale-105"
                  onClick={() => setEditMode(!editMode)}
                >
                  Cancel changes
                </button>
              </>
            )}
            {deleteMode && (
              <>
                <button
                  className="accent-primary rounded p-2 hover:scale-105 hover:bg-red-500"
                  onClick={() => {
                    setDeleteMode(!deleteMode);
                    deleteProfile.mutate();
                  }}
                >
                  Confirm Delete
                </button>
                <button
                  className="accent-primary rounded p-2 hover:scale-105"
                  onClick={() => setDeleteMode(!deleteMode)}
                >
                  Cancel delete
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
