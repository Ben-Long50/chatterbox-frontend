import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiTrashCanOutline, mdiPlus, mdiMinus } from '@mdi/js';
import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from './AuthContext';
import Label from './Label';
import { io } from 'socket.io-client';
import ScrollBar from 'react-perfect-scrollbar';
import useCreateChatMutation from '../hooks/useCreateChatMutation/useCreateChatMutation';
import useDeleteChatMutation from '../hooks/useDeleteChatMutation/useDeleteChatMutation';
import useRemoveFromChatMutation from '../hooks/useRemoveFromChatMutation/useRemoveFromChatMutation';
import { useQueryClient } from '@tanstack/react-query';

const ChatList = (props) => {
  const { apiUrl, currentUser } = useContext(AuthContext);

  const inputRef = useRef(null);
  const socketRef = useRef(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const socket = io(apiUrl, {
      query: { token },
    });

    socketRef.current = socket;

    socket.on('createChat', () => {
      queryClient.invalidateQueries(['chats']);
    });

    socket.on('deleteChat', () => {
      queryClient.invalidateQueries(['chats']);
    });

    socket.on('removeFromChat', () => {
      queryClient.invalidateQueries(['chats']);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser, props]);

  const createChat = useCreateChatMutation(apiUrl);
  const deleteChat = useDeleteChatMutation(apiUrl);
  const removeFromChat = useRemoveFromChatMutation(apiUrl);

  const handleCreateChat = () => {
    const chat = { name: inputRef.current.value, author: currentUser._id };
    inputRef.current.value = '';
    createChat.mutate(chat);
  };

  return (
    <>
      <ScrollBar className="my-2 flex grow flex-col gap-2 overflow-y-auto px-4">
        {props.chats.map((chat) => {
          if (chat.name !== 'Global') {
            return (
              <li
                key={chat.name}
                className={`list-secondary group/chat flex items-center ${props.activeId === chat._id && 'accent-primary'}`}
              >
                <Link
                  to={`/chats/${chat.name}`}
                  id={chat._id}
                  className="mr-auto box-border flex flex-grow items-center p-3"
                  onClick={() => {
                    props.handleId(chat._id);
                    props.hideSidebar();
                  }}
                >
                  {chat.members.map((member, index) => {
                    return (
                      <div
                        key={index}
                        className={`${index > 0 && '-ml-1.5'} group/profile text-primary -my-3 -ml-2 flex size-10 items-center justify-center rounded-full bg-gray-300 object-cover text-center text-2xl ring-2 transition duration-300 dark:bg-gray-700 ${props.activeId === chat._id ? 'ring-yellow-200 group-hover/chat:ring-yellow-300' : 'ring-gray-100 group-hover/chat:ring-gray-200 dark:ring-gray-900 group-hover/chat:dark:ring-gray-800'}`}
                      >
                        {props.activeId !== chat._id && (
                          <button
                            className={`group/button hidden size-10 scale-105 items-center justify-center rounded-full bg-transparent p-1 text-transparent transition duration-300 group-hover/profile:flex ${props.activeId === chat._id ? 'hover:bg-yellow-300' : 'hover:bg-gray-800'} `}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              removeFromChat.mutate({
                                chatId: chat._id,
                                memberId: member._id,
                              });
                            }}
                          >
                            <p
                              className={`group-hover/button:text-tertiary pointer-events-none absolute -translate-y-7 translate-x-1/2 text-nowrap rounded border-transparent p-1 text-sm text-transparent duration-300 group-hover/button:bg-gray-100 group-hover/button:dark:bg-gray-900`}
                            >
                              {`Remove ${member.username} from chat`}
                            </p>
                            <Icon
                              className={`${props.activeId === chat._id && 'text-gray-900'} text-primary`}
                              path={mdiMinus}
                              size={1.2}
                            ></Icon>
                          </button>
                        )}
                        <p
                          className={`block ${props.activeId !== chat._id && 'group-hover/profile:hidden'}`}
                        >
                          {member.username[0].toUpperCase()}
                        </p>
                      </div>
                    );
                  })}
                  <p className="ml-2">{chat.name}</p>
                </Link>
                {props.activeId !== chat._id && (
                  <Label
                    buttonClass={`${props.activeId === chat._id && 'group-hover/chat:text-gray-900 dark:hover:bg-yellow-200 hover:bg-yellow-200'} group-hover/chat:text-secondary`}
                    labelClass={'-translate-x-full'}
                    label="Delete chat"
                    icon={mdiTrashCanOutline}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat.mutate(chat._id);
                    }}
                  />
                )}
              </li>
            );
          }
        })}
      </ScrollBar>
      <form
        onSubmit={handleCreateChat}
        className="mt-2 flex items-center justify-start gap-4 px-4"
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
    </>
  );
};

export default ChatList;
