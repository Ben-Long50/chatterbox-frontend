import UserInfo from './UserInfo';
import List from './List';
import { Link } from 'react-router-dom';
import { useState, useContext, useRef } from 'react';
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiMinus, mdiPlus } from '@mdi/js';
import { AuthContext } from './AuthContext';

const Sidebar = (props) => {
  const [activeItem, setActiveItem] = useState('global');
  const [input, setInput] = useState('');
  const { apiUrl, signout, userId } = useContext(AuthContext);

  const chatNameRef = useRef(null);

  const handleClick = (e, id) => {
    setActiveItem(e.currentTarget);
    props.setActiveChatId(id);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const createChat = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const chat = { name: input, author: userId };

    try {
      const response = await fetch(`${apiUrl}/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(chat),
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result.message);
        chatNameRef.current.value = '';
      }
    } catch (error) {
      console.error(error);
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

  const addUserAsFriend = async (newFriendId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/users/${userId}/friends`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newFriendId }),
      });
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteChat = async (chatId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/chats/${chatId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ chatId }),
      });
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
    <div
      className={`z-10 col-end-2 row-start-1 flex h-screen flex-col justify-between bg-gray-100 transition duration-300 max-sm:col-start-1 max-sm:col-end-3 dark:bg-gray-900 ${!props.visibility && '-translate-x-full'} sticky top-0`}
    >
      <div className="px-4 py-6">
        <div className="mb-5 flex items-center justify-between pl-2">
          <h1 className="text-primary place-content-center text-3xl font-semibold">
            Chatterbox
          </h1>
          <button
            className={`accent-primary z-50 grid shrink-0 place-content-center rounded-full hover:scale-110 ${!props.visibility && 'translate-x-180'}`}
            onClick={props.handleVisibility}
          >
            <Icon
              path={mdiChevronLeft}
              size={1.75}
              className={`text-inherit transition duration-300 ${!props.visibility && 'rotate-180'}`}
            ></Icon>
          </button>
        </div>
        <ul>
          <li>
            <Link
              to="global"
              className={`list-primary ${activeItem === 'global' ? 'accent-primary' : ''}`}
              onClick={() =>
                handleClick({ currentTarget: 'global' }, props.chats[0]._id)
              }
            >
              Global Chat
            </Link>
          </li>
          <hr className="my-2 border-t border-gray-400 dark:border-gray-500" />
          <li>
            <List heading="Private Chats">
              {props.chats.map((chat) => {
                if (chat.name !== 'Global') {
                  return (
                    <li
                      key={chat.name}
                      className={`list-secondary group/chat flex items-center ${activeItem === chat.name && 'accent-primary'}`}
                    >
                      <Link
                        to={`/chats/${chat.name}`}
                        id={chat._id}
                        className="mr-auto box-border flex-grow p-3"
                        onClick={() =>
                          handleClick({ currentTarget: chat.name }, chat._id)
                        }
                      >
                        <p>{chat.name}</p>
                      </Link>
                      {activeItem !== chat.name && (
                        <button
                          type="submit"
                          className="-mx-2 -my-3 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-900"
                          onClick={() => deleteChat(chat._id)}
                        >
                          <Icon
                            className="group-hover/chat:text-secondary text-transparent"
                            path={mdiMinus}
                            size={1.2}
                          ></Icon>
                        </button>
                      )}
                    </li>
                  );
                }
              })}
              <li>
                <form
                  method="post"
                  className="my-4 flex items-center justify-start gap-4"
                  onSubmit={createChat}
                >
                  <input
                    ref={chatNameRef}
                    className="text-primary w-full rounded bg-gray-200 p-2 dark:bg-gray-700"
                    type="text"
                    placeholder="New chat name"
                    onChange={handleChange}
                  />
                  <button
                    type="submit"
                    className="-mx-2 -my-3 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Icon
                      className="text-secondary"
                      path={mdiPlus}
                      size={1.2}
                    ></Icon>
                  </button>
                </form>
              </li>
            </List>
          </li>
          <hr className="my-2 border-t border-gray-400 dark:border-gray-500" />
          <li>
            <List heading="Friends">
              {props.friends.map((friend) => {
                return (
                  <li
                    key={friend._id}
                    className="list-secondary group/friend flex items-center"
                  >
                    <Link
                      to={`/users/${friend.username}`}
                      id={friend._id}
                      className={`flex flex-grow items-center gap-4 p-3 ${activeItem === friend.username && 'accent-primary'}`}
                      onClick={() =>
                        handleClick(
                          { currentTarget: friend.username },
                          friend._id,
                        )
                      }
                    >
                      <div className="text-primary -my-3 -ml-2 flex size-10 items-center justify-center rounded-full bg-white object-cover text-center text-2xl dark:bg-gray-700">
                        <p>{friend.username[0].toUpperCase()}</p>
                      </div>
                      <p>{friend.username}</p>
                    </Link>
                    {activeItem !== 'global' && (
                      <button
                        type="submit"
                        className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-900"
                        onClick={() => addFriendToChat(friend._id)}
                      >
                        <Icon
                          className="group-hover/friend:text-secondary text-transparent"
                          path={mdiPlus}
                          size={1.2}
                        ></Icon>
                      </button>
                    )}
                    <button
                      type="submit"
                      className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-900"
                      onClick={() => removeFriend(friend._id)}
                    >
                      <Icon
                        className="group-hover/friend:text-secondary text-transparent"
                        path={mdiMinus}
                        size={1.2}
                      ></Icon>
                    </button>
                  </li>
                );
              })}
            </List>
          </li>
          <hr className="my-2 border-t border-gray-400 dark:border-gray-500" />
          <li>
            <List heading="All Members">
              {props.allUsers.map((user) => {
                return (
                  <li
                    key={user._id}
                    className="list-secondary group/user flex items-center"
                  >
                    <Link
                      to={`/users/${user.username}`}
                      id={user._id}
                      className={`box-border flex flex-grow items-center gap-4 p-3 ${activeItem === user.username && 'accent-primary'}`}
                      onClick={() =>
                        handleClick({ currentTarget: user.username }, user._id)
                      }
                    >
                      <div className="text-primary -my-3 -ml-2 flex size-10 items-center justify-center rounded-full bg-white object-cover text-center text-2xl dark:bg-gray-700">
                        <p>{user.username[0].toUpperCase()}</p>
                      </div>
                      <p>{user.username}</p>
                    </Link>
                    <button
                      type="submit"
                      className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-900"
                      onClick={() => addUserAsFriend(user._id)}
                    >
                      <Icon
                        className="group-hover/user:text-secondary text-transparent"
                        path={mdiPlus}
                        size={1.2}
                      ></Icon>
                    </button>
                  </li>
                );
              })}
            </List>
          </li>
          <hr className="my-2 border-t border-gray-400 dark:border-gray-500" />
          <li>
            <List heading="Account">
              <Link
                className={`list-secondary flex-grow p-3 ${activeItem === 'details' && 'accent-primary'}`}
                onClick={() => handleClick({ currentTarget: 'details' })}
              >
                Details
              </Link>
              <Link
                className={`list-secondary flex-grow p-3 ${activeItem === 'security' && 'accent-primary'}`}
                onClick={() => handleClick({ currentTarget: 'security' })}
              >
                Security
              </Link>
              <form action="/signin" onSubmit={signout}>
                <button className="list-secondary flex-grow p-3" type="submit">
                  Sign out
                </button>
              </form>
            </List>
          </li>
        </ul>
      </div>
      <UserInfo />
    </div>
  );
};

export default Sidebar;
