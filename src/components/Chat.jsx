import Icon from '@mdi/react';
import { mdiSend } from '@mdi/js';
import { useState, useRef, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import { AuthContext } from './AuthContext';
import { useOutletContext } from 'react-router-dom';
import MessageSent from './MessageSent';
import MessageReceived from './MessageReceived';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './../custom-scrollbar.css';
import io from 'socket.io-client';
import Loading from './Loading';
import useChatInfoQuery from '../hooks/useChatInfoQuery/useChatInfoQuery';
import useCreateMessageMutation from '../hooks/useCreateMessageMutation/useCreateMessageMutation';
import { useQueryClient } from '@tanstack/react-query';

const Chat = () => {
  const [draft, setDraft] = useState('');
  const [sentMessages, setSentMessages] = useState([]);
  const [activeId, setActiveId, visibility, chats] = useOutletContext();
  const { apiUrl, currentUser } = useContext(AuthContext);

  const chatInfo = useChatInfoQuery(activeId, apiUrl);
  const createMessage = useCreateMessageMutation(activeId, apiUrl);

  const inputRef = useRef(null);
  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ block: 'start' });
    }, 1);
  }, [chatInfo]);

  useEffect(() => {
    setSentMessages([]);
  }, [chatInfo.data]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const socket = io(apiUrl, {
      query: { token },
    });

    socketRef.current = socket;

    socket.emit('joinChat', activeId);

    socket.on('newMessage', () => {
      queryClient.invalidateQueries(['chatInfo']);
    });

    socket.on('deletedMessage', () => {
      queryClient.invalidateQueries(['chatInfo']);
    });

    return () => {
      socket.emit('leaveChat', activeId);
      socket.disconnect();
    };
  }, [activeId, chats]);

  const handleChange = (e) => {
    setDraft(e.target.value);
  };

  const handleSubmit = async (e) => {
    setSentMessages((prevSentMessages) => [...prevSentMessages, draft]);
    e.preventDefault();
    const message = {
      message: draft,
      author: currentUser._id,
      date: new Date(),
    };
    createMessage.mutate(message);
    setDraft('');
  };

  if (chatInfo.isLoading || chatInfo.isPending) {
    return <Loading />;
  }

  return (
    <PerfectScrollbar
      className={`row-start-1 h-dvh w-full min-w-0 flex-col overflow-y-auto max-lg:col-start-1 max-lg:col-end-3 ${visibility ? 'col-start-2 col-end-3' : 'col-start-1 col-end-3'}`}
    >
      <div className="flex min-h-dvh flex-col items-center justify-between">
        <div className="sticky top-0 flex w-full justify-center bg-gradient-to-b from-white from-10% to-transparent pt-8 dark:from-gray-700">
          {chatInfo.data.members.map((member, index) => {
            return (
              <div
                key={index}
                className={`${index > 0 && '-ml-1.5'} text-primary flex size-12 items-center justify-center rounded-full bg-gray-300 object-cover text-center text-3xl ring-2 ring-white dark:bg-gray-900 dark:ring-gray-700`}
              >
                <p>{member.username[0].toUpperCase()}</p>
              </div>
            );
          })}
          <h1 className="text-primary mb-40 ml-4 mt-1 text-center text-4xl font-semibold">
            {chatInfo.data.name}
          </h1>
        </div>
        <div className="mx-auto w-full max-w-screen-xl shrink-0 gap-1 self-end px-4 lg:px-8">
          {chatInfo.data.messages.map((message, index) => {
            const isNewDate =
              index === 0 ||
              format(chatInfo.data.messages[index - 1].date, 'PP') !==
                format(message.date, 'PP');
            return (
              <>
                {isNewDate && (
                  <p className="text-tertiary text-center text-sm">
                    {format(message.date, 'PP')}
                  </p>
                )}
                {message.author._id === currentUser._id ? (
                  <MessageSent
                    body={message.body}
                    author={message.author}
                    date={message.date}
                    id={message._id}
                    chatId={activeId}
                  />
                ) : (
                  <MessageReceived
                    body={message.body}
                    author={message.author}
                    date={message.date}
                    id={message._id}
                    chatId={activeId}
                  />
                )}
              </>
            );
          })}
          {createMessage.isPending &&
            sentMessages?.map((message, index) => (
              <MessageSent
                key={index}
                className="new-message opacity-50"
                body={message}
                author={currentUser}
                date={createMessage.submittedAt}
                chatId={activeId}
              />
            ))}
          <div ref={bottomRef}></div>
          <form
            method="post"
            className="sticky bottom-0 mt-4 flex items-center justify-center gap-6 pb-4 max-md:gap-3 md:ml-auto md:mr-auto lg:mt-12 lg:pb-8"
            onSubmit={handleSubmit}
          >
            <input
              ref={inputRef}
              className="text-primary w-full max-w-xl rounded bg-gray-200 p-3 dark:bg-gray-900"
              type="text"
              placeholder="The world awaits your message..."
              onChange={handleChange}
              value={draft}
            />
            <button
              type="submit"
              className={
                'accent-primary grid shrink-0 place-content-center rounded-full p-2 hover:scale-110'
              }
            >
              <Icon
                className="translate-x-10"
                path={mdiSend}
                size={1.25}
                rotate={-45}
              ></Icon>
            </button>
          </form>
        </div>
      </div>
    </PerfectScrollbar>
  );
};

export default Chat;
