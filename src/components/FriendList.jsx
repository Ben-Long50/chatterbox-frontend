import List from './List';
import { Link } from 'react-router-dom';
import Label from './Label';
import { mdiPlus, mdiMinus } from '@mdi/js';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from './AuthContext';
import { io } from 'socket.io-client';

const FriendList = (props) => {
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const { apiUrl, currentUser } = useContext(AuthContext);

  const inputRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchFriends = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/users/${currentUser._id}/friends`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        if (response.ok) {
          setFriends(data);
          setFilteredFriends(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchFriends();

    const socket = io(apiUrl, {
      query: { token },
    });

    socketRef.current = socket;

    socket.on('addFriend', ({ newFriend, user }) => {
      if (user._id === currentUser._id) {
        setFriends((prevFriends) => [...prevFriends, newFriend]);
        setFilteredFriends((prevFiltered) => [...prevFiltered, newFriend]);
      }
      if (newFriend._id === currentUser._id) {
        setFriends((prevFriends) => [...prevFriends, user]);
        setFilteredFriends((prevFiltered) => [...prevFiltered, user]);
      }
    });

    socket.on('removeFriend', ({ oldFriend, user }) => {
      if (user._id === currentUser._id) {
        setFriends((prevFriends) =>
          prevFriends.filter((friend) => friend._id !== oldFriend._id),
        );
        setFilteredFriends((prevFiltered) =>
          prevFiltered.filter((friend) => friend._id !== oldFriend._id),
        );
      }
      if (oldFriend._id === currentUser._id) {
        setFriends((prevFriends) =>
          prevFriends.filter((friend) => friend._id !== user._id),
        );
        setFilteredFriends((prevFiltered) =>
          prevFiltered.filter((friend) => friend._id !== user._id),
        );
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser._id]);

  const handleChange = () => {
    if (inputRef.current.value === '') {
      setFilteredFriends(friends);
    } else {
      const filteredFriends = friends.filter((friend) => {
        return friend.username
          .toLowerCase()
          .startsWith(inputRef.current.value.toLowerCase());
      });
      setFilteredFriends(filteredFriends);
    }
  };

  const addFriendToChat = async (friendId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${apiUrl}/chats/${props.activeId}/members`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ friendId }),
        },
      );
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFriend = async (friendId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${apiUrl}/users/${currentUser._id}/friends`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ friendId }),
        },
      );
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <List heading="Friends">
      <input
        ref={inputRef}
        className="text-primary my-2 w-full rounded bg-gray-200 p-2 dark:bg-gray-700"
        type="text"
        placeholder="Search friends"
        onChange={handleChange}
      />
      {filteredFriends.map((friend) => {
        return (
          <li
            key={friend._id}
            className={`list-secondary group/friend flex items-center ${props.activeId === friend._id && 'accent-primary'}`}
          >
            <Link
              to={`/users/${friend.username}`}
              id={friend._id}
              className="flex flex-grow items-center gap-4 p-3"
              state={{ userId: friend._id }}
              onClick={() => {
                props.handleId(friend._id);
                props.hideSidebar();
              }}
            >
              <div className="text-primary -my-3 -ml-2 flex size-10 items-center justify-center rounded-full bg-gray-300 object-cover text-center text-2xl dark:bg-gray-700">
                <p>{friend.username[0].toUpperCase()}</p>
              </div>
              <p>{friend.username}</p>
            </Link>
            {props.activeId !== 'global' && (
              <Label
                buttonClass={`${props.activeId === friend._id && 'group-hover/friend:text-gray-900 dark:hover:bg-yellow-200 hover:bg-yellow-200'} group-hover/friend:text-secondary`}
                labelClass={'-translate-x-full'}
                label="Add friend to active chat"
                icon={mdiPlus}
                onClick={() => addFriendToChat(friend._id)}
              />
            )}
            <Label
              buttonClass={`${props.activeId === friend._id && 'group-hover/friend:text-gray-900 dark:hover:bg-yellow-200 hover:bg-yellow-200'} group-hover/friend:text-secondary`}
              labelClass={'-translate-x-full'}
              label="Remove friend"
              icon={mdiMinus}
              onClick={() => removeFriend(friend._id)}
            />
          </li>
        );
      })}
    </List>
  );
};

export default FriendList;
