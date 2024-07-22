import Icon from '@mdi/react';
import { mdiSend } from '@mdi/js';
import { useState, useRef, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import { AuthContext } from './AuthContext';
import { useOutletContext } from 'react-router-dom';
import MessageSent from './MessageSent';
import MessageReceived from './MessageReceived';

const Chat = () => {
  const [chatInfo, setChatInfo] = useState({
    name: '',
    messages: [],
    members: [],
  });
  const [draft, setDraft] = useState('');
  const [activeChatId, setActiveChatId, visibility] = useOutletContext();
  const { apiUrl, userId } = useContext(AuthContext);

  const inputRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

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
        const data = await response.json();
        if (response.ok) {
          setChatInfo(data);
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
    <div
      className={`container row-start-1 flex max-w-screen-xl flex-col justify-between max-lg:col-start-1 max-lg:col-end-3 ${visibility ? 'col-start-2 col-end-3' : 'col-start-1 col-end-3'}`}
    >
      <div className="sticky top-0 flex w-full justify-center bg-gradient-to-b from-white from-10% to-transparent pt-8 dark:from-gray-700">
        {chatInfo.members.map((member, index) => {
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
          {chatInfo.name}
        </h1>
      </div>
      <div className="mt-auto gap-1 overflow-y-auto pb-4 lg:pb-8">
        {chatInfo.messages.map((message, index) => {
          const isNewDate =
            index === 0 ||
            format(chatInfo.messages[index - 1].date, 'PP') !==
              format(message.date, 'PP');
          return (
            <>
              {isNewDate && (
                <p className="text-tertiary text-center text-sm">
                  {format(message.date, 'PP')}
                </p>
              )}
              {message.author._id === userId ? (
                <MessageSent
                  body={message.body}
                  author={message.author}
                  date={message.date}
                  id={message._id}
                  chatId={activeChatId}
                />
              ) : (
                <MessageReceived
                  body={message.body}
                  author={message.author}
                  date={message.date}
                  id={message._id}
                  chatId={activeChatId}
                />
              )}
            </>
          );
        })}
        <form
          method="post"
          className="mt-12 flex items-center justify-center gap-6 max-md:gap-3 md:ml-auto md:mr-auto"
          onSubmit={handleSubmit}
        >
          <input
            ref={inputRef}
            className="text-primary w-full max-w-xl rounded bg-gray-200 p-3 dark:bg-gray-900"
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
  );
};

export default Chat;
