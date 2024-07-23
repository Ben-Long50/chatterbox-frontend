import List from './List';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiTrashCanOutline, mdiPlus } from '@mdi/js';
import { useContext, useRef } from 'react';
import { AuthContext } from './AuthContext';
import Label from './Label';

const ChatList = (props) => {
  const { apiUrl, userId } = useContext(AuthContext);

  const inputRef = useRef(null);

  const createChat = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const chat = { name: inputRef.current.value, author: userId };

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
        inputRef.current.value = '';
      }
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

  return (
    <List heading="Private Chats">
      {props.chats.map((chat) => {
        if (chat.name !== 'Global') {
          return (
            <li
              key={chat.name}
              className={`list-secondary group/chat flex items-center ${props.activeItem === chat.name && 'accent-primary'}`}
            >
              <Link
                to={`/chats/${chat.name}`}
                id={chat._id}
                className="mr-auto box-border flex flex-grow items-center p-3"
                onClick={() =>
                  props.handleClick({ currentTarget: chat.name }, chat._id)
                }
              >
                {chat.members.map((member, index) => {
                  return (
                    <div
                      key={index}
                      className={`${index > 0 && '-ml-1.5'} text-primary -my-3 -ml-2 flex size-10 items-center justify-center rounded-full bg-gray-300 object-cover text-center text-2xl ring-2 transition duration-300 dark:bg-gray-700 ${props.activeItem === chat.name ? 'ring-yellow-200 group-hover/chat:ring-yellow-300' : 'ring-gray-100 group-hover/chat:ring-gray-200 dark:ring-gray-900 group-hover/chat:dark:ring-gray-800'}`}
                    >
                      <p>{member.username[0].toUpperCase()}</p>
                    </div>
                  );
                })}
                <p className="ml-2">{chat.name}</p>
              </Link>
              {props.activeItem !== chat.name && (
                <Label
                  buttonClass={`${props.activeItem === chat.name && 'group-hover/chat:text-gray-900 dark:hover:bg-yellow-200 hover:bg-yellow-200'} group-hover/chat:text-secondary`}
                  label="Delete chat"
                  icon={mdiTrashCanOutline}
                  onClick={() => {
                    deleteChat(chat._id);
                  }}
                />
              )}
            </li>
          );
        }
      })}
      <li>
        <form
          method="post"
          className="my-2 flex items-center justify-start gap-4"
          onSubmit={createChat}
        >
          <input
            ref={inputRef}
            className="text-primary w-full rounded bg-gray-200 p-2 dark:bg-gray-700"
            type="text"
            placeholder="New chat name"
          />
          <button
            type="submit"
            className="-mx-2 -my-3 rounded-full p-1 transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Icon className="text-secondary" path={mdiPlus} size={1.2}></Icon>
          </button>
        </form>
      </li>
    </List>
  );
};

export default ChatList;
