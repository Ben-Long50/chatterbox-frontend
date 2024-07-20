import UserInfo from './UserInfo';
import List from './List';
import { Link } from 'react-router-dom';
import { useState, useContext, useRef } from 'react';
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiPlus } from '@mdi/js';
import { AuthContext } from './AuthContext';

const Sidebar = (props) => {
  const [activeItem, setActiveItem] = useState('global');
  const [visibility, setVisibility] = useState(true);
  const [input, setInput] = useState('');
  const { apiUrl, signout, userId } = useContext(AuthContext);

  const chatNameRef = useRef(null);

  const handleClick = (e, id) => {
    setActiveItem(e.currentTarget);
    props.setActiveChatId(id);
    console.log(props.activeChatId);
  };

  const handleVisibility = () => {
    setVisibility(!visibility);
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

  return (
    <div
      className={`flex h-screen max-w-md flex-grow flex-col justify-between border-e border-none bg-gray-100 transition duration-300 dark:bg-gray-900 ${!visibility && '-translate-x-full'} sticky top-0`}
    >
      <div className="px-4 py-6">
        <div className="mb-5 flex items-center justify-between pl-2">
          <h1 className="text-primary place-content-center text-3xl font-semibold">
            Chatterbox
          </h1>
          <span
            className={`accent-primary grid shrink-0 place-content-center rounded-full hover:scale-110 ${!visibility && 'translate-x-180'}`}
          >
            <Icon
              path={mdiChevronLeft}
              size={1.75}
              className={`text-inherit transition duration-300 ${!visibility && 'rotate-180'}`}
              onClick={handleVisibility}
            ></Icon>
          </span>
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
                    <li key={chat.name}>
                      <Link
                        to={`/chats/${chat.name}`}
                        id={chat._id}
                        className={`list-secondary ${activeItem === chat.name && 'accent-primary'}`}
                        onClick={() =>
                          handleClick({ currentTarget: chat.name }, chat._id)
                        }
                      >
                        {chat.name}
                      </Link>
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
                    className="list-secondary group flex items-center justify-between"
                  >
                    <Link
                      to={`/users/${friend.username}`}
                      id={friend._id}
                      className={`flex items-center gap-4 ${activeItem === friend.username && 'accent-primary'}`}
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
                        className="-mx-2 -my-3 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-900"
                        onClick={() => addFriendToChat(friend._id)}
                      >
                        <Icon
                          className="group-hover:text-secondary text-transparent"
                          path={mdiPlus}
                          size={1.2}
                        ></Icon>
                      </button>
                    )}
                  </li>
                );
              })}
            </List>
          </li>
          <hr className="my-2 border-t border-gray-400 dark:border-gray-500" />
          <li>
            <List heading="Account">
              <Link
                // to="accout/details"
                className={`list-secondary ${activeItem === 'details' && 'accent-primary'}`}
                onClick={() => handleClick({ currentTarget: 'details' })}
              >
                Details
              </Link>
              <Link
                // to="account/security"
                className={`list-secondary ${activeItem === 'security' && 'accent-primary'}`}
                onClick={() => handleClick({ currentTarget: 'security' })}
              >
                Security
              </Link>
              <form action="/signin" onSubmit={signout}>
                <button className="list-secondary" type="submit">
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
