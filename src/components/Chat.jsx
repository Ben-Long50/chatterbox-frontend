import Icon from '@mdi/react';
import { mdiSend } from '@mdi/js';
import { useState, useRef, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import { AuthContext } from './AuthContext';
import { useOutletContext } from 'react-router-dom';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [activeChatId] = useOutletContext();
  const { apiUrl, userId } = useContext(AuthContext);

  const inputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/chats/${activeChatId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const messages = await response.json();
        if (response.ok) {
          setMessages(messages);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [activeChatId]);

  const handleChange = (e) => {
    setDraft(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const message = { message: draft, author: userId, date: new Date() };
    console.log(messages);
    console.log(userId);

    try {
      const response = await fetch(`${apiUrl}/chats/${activeChatId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(message),
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

  return (
    <>
      <div className="container flex max-w-screen-xl flex-col justify-between">
        <div className="fixed top-0 h-1/4 w-full bg-gradient-to-b from-white from-5% to-transparent dark:from-gray-700"></div>
        <div className="mt-auto flex flex-col gap-4 pb-8 pt-48">
          {messages.map((message, index) => {
            const isNewDate =
              index === 0 ||
              format(messages[index - 1].date, 'PP') !==
                format(message.date, 'PP');
            return (
              <>
                {isNewDate && (
                  <p className="text-tertiary self-center text-sm">
                    {format(message.date, 'PP')}
                  </p>
                )}

                <div
                  key={index}
                  className={`group flex flex-col ${message.author._id === userId ? 'self-end' : 'self-start'}`}
                >
                  <p
                    className={`text-tertiary text-xs ${message.author._id === userId ? 'text-right' : 'text-left'}`}
                  >
                    {message.author.username}
                  </p>
                  <div
                    className={`my-2 ${message.author._id === userId ? 'message-sent' : 'message-received'}`}
                  >
                    <p className="text-inherit">{message.body}</p>
                  </div>
                  <p
                    className={`text-tertiary invisible text-xs group-hover:visible ${message.author._id === userId ? 'text-right' : 'text-left'}`}
                  >
                    {format(message.date, 'pp')}
                  </p>
                </div>
              </>
            );
          })}
          <form
            method="post"
            className="ml-auto mr-auto mt-12 flex w-1/2 min-w-96 items-center gap-6"
            onSubmit={handleSubmit}
          >
            <input
              ref={inputRef}
              className="text-primary w-full rounded bg-gray-200 p-3 dark:bg-gray-900"
              type="text"
              placeholder="The world awaits your message..."
              onChange={handleChange}
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
    </>
  );
};

export default Chat;
