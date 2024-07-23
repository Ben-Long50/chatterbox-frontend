import List from './List';
import Icon from '@mdi/react';
import { Link } from 'react-router-dom';
import Label from './Label';
import { mdiPlus, mdiMinus } from '@mdi/js';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from './AuthContext';

const FriendList = (props) => {
  const [friends, setFriends] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const { apiUrl, userId } = useContext(AuthContext);

  const inputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchFriends = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/${userId}/friends`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
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
  }, [userId]);

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
        `${apiUrl}/chats/${props.activeChatId}/members`,
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
      const response = await fetch(`${apiUrl}/users/${userId}/friends`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ friendId }),
      });
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
            className={`list-secondary group/friend flex items-center ${props.activeItem === friend.username && 'accent-primary'}`}
          >
            <Link
              to={`/users/${friend.username}`}
              id={friend._id}
              className="flex flex-grow items-center gap-4 p-3"
              state={{ member: friend }}
              onClick={() =>
                props.handleClick(
                  { currentTarget: friend.username },
                  friend._id,
                )
              }
            >
              <div className="text-primary -my-3 -ml-2 flex size-10 items-center justify-center rounded-full bg-gray-300 object-cover text-center text-2xl dark:bg-gray-700">
                <p>{friend.username[0].toUpperCase()}</p>
              </div>
              <p>{friend.username}</p>
            </Link>
            {props.activeItem !== 'global' && (
              <Label
                buttonClass={`${props.activeItem === friend.username && 'group-hover/friend:text-gray-900 dark:hover:bg-yellow-200 hover:bg-yellow-200'} group-hover/friend:text-secondary`}
                label="Add friend to active chat"
                icon={mdiPlus}
                onClick={() => addFriendToChat(friend._id)}
              />
            )}
            <Label
              buttonClass={`${props.activeItem === friend.username && 'group-hover/friend:text-gray-900 dark:hover:bg-yellow-200 hover:bg-yellow-200'} group-hover/friend:text-secondary`}
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
