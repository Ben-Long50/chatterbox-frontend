import ScrollBar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';
import Label from './Label';
import { mdiPlus, mdiMinus, mdiAccountMinus, mdiChatPlus } from '@mdi/js';
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from './AuthContext';
import { io } from 'socket.io-client';
import useFriendQuery from '../hooks/useFriendQuery/useFriendQuery';
import useAddFriendToChatMutation from '../hooks/useAddFriendToChatMutation/useAddFriendToChatMutation';
import useRemoveFriendMutation from '../hooks/useRemoveFriendMutation/useRemoveFriendMutation';
import { useQueryClient } from '@tanstack/react-query';
import SettingsMenu from './SettingsMenu';

const FriendList = (props) => {
  const { apiUrl, currentUser } = useContext(AuthContext);
  const friends = useFriendQuery(currentUser, apiUrl);
  const [filteredFriends, setFilteredFriends] = useState([]);

  useEffect(() => {
    setFilteredFriends(friends?.data);
  }, [friends.data]);

  const inputRef = useRef(null);
  const socketRef = useRef(null);

  const addFriendToChat = useAddFriendToChatMutation(props.activeId, apiUrl);
  const removeFriend = useRemoveFriendMutation(currentUser, apiUrl);

  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const socket = io(apiUrl, {
      query: { token },
    });

    socketRef.current = socket;

    socket.on('addFriend', () => {
      queryClient.invalidateQueries(['friends']);
    });

    socket.on('removeFriend', () => {
      queryClient.invalidateQueries(['friends']);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser._id]);

  const handleChange = () => {
    if (inputRef.current.value === '') {
      setFilteredFriends(friends.data);
    } else {
      const filteredFriends = friends.data.filter((friend) => {
        return friend.username
          .toLowerCase()
          .includes(inputRef.current.value.toLowerCase());
      });
      setFilteredFriends(filteredFriends);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        className="text-primary mx-4 my-2 rounded bg-gray-200 p-2 dark:bg-gray-700"
        type="text"
        placeholder="Search friends"
        onChange={handleChange}
      />
      <ScrollBar className="my-2 flex grow flex-col gap-2 overflow-y-auto px-4">
        {filteredFriends?.length > 0 &&
          filteredFriends.map((friend) => {
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
                <SettingsMenu
                  id={friend._id}
                  visibleMenuId={props.visibleMenuId}
                  setVisibleMenuId={props.setVisibleMenuId}
                >
                  {props.activeId !== props.globalChat._id && (
                    <Label
                      label="Add friend to active chat"
                      icon={mdiChatPlus}
                      onClick={(e) => {
                        e.stopPropagation();
                        addFriendToChat.mutate(friend._id);
                      }}
                    />
                  )}
                  <Label
                    label="Remove as friend"
                    icon={mdiAccountMinus}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFriend.mutate(friend._id);
                    }}
                  />
                </SettingsMenu>
              </li>
            );
          })}
      </ScrollBar>
    </>
  );
};

export default FriendList;
