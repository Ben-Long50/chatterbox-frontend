import Icon from '@mdi/react';
import { mdiSend } from '@mdi/js';
import { useState, useRef } from 'react';
import { format } from 'date-fns';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');

  const inputRef = useRef(null);

  const handleChange = (e) => {
    setDraft(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedMessages = [...messages, { body: draft, date: new Date() }];
    setMessages(updatedMessages);
    inputRef.current.value = '';
  };

  return (
    <div className="container bottom-0 flex max-w-screen-xl flex-col justify-end gap-4 pb-8">
      {messages.map((message, index) => {
        const isNewDate =
          index === 0 ||
          format(messages[index - 1].date, 'PP') !== format(message.date, 'PP');
        return (
          <>
            {isNewDate && (
              <p className="text-tertiary self-center text-sm">
                {format(message.date, 'PP')}
              </p>
            )}

            <div key={index} className="self-end">
              <div className="message-sent mb-1">
                <p className="text-inherit">{message.body}</p>
              </div>
              <p className="text-tertiary text-sm">
                {format(message.date, 'pp')}
              </p>
            </div>
          </>
        );
      })}
      <form
        action="post"
        className="ml-auto mr-auto mt-12 flex w-1/2 min-w-96 items-center gap-6"
      >
        <input
          ref={inputRef}
          className="text-primary w-full rounded bg-gray-200 p-3 dark:bg-gray-900"
          type="text"
          placeholder="The world awaits your message..."
          onChange={handleChange}
        />
        <button
          className={
            'accent-primary grid shrink-0 place-content-center rounded-full p-2 hover:scale-110'
          }
          onClick={handleSubmit}
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
  );
};

export default Chat;
