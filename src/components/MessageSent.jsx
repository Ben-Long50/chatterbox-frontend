import { format } from 'date-fns';
import { useContext, useEffect, useRef, useState } from 'react';
import Icon from '@mdi/react';
import { mdiTrashCanOutline } from '@mdi/js';
import { AuthContext } from './AuthContext';

const MessageSent = (props) => {
  const [boxWidth, setBoxWidth] = useState(null);
  const boxRef = useRef(null);
  const { apiUrl } = useContext(AuthContext);

  useEffect(() => {
    const boxRect = boxRef.current.getBoundingClientRect();
    setBoxWidth(boxRect.width);
  }, []);

  const deleteMessage = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${apiUrl}/chats/${props.chatId}/messages/${props.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="group mb-1 flex flex-col self-end">
      <p className="text-tertiary text-right text-xs">
        {props.author.username}
      </p>
      <div className="ml-auto flex items-center justify-end gap-4">
        <button
          type="submit"
          className="rounded-full p-1 transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-900"
          onClick={deleteMessage}
        >
          <Icon
            className="group-hover:text-secondary text-transparent transition duration-300"
            path={mdiTrashCanOutline}
            size={1.2}
          ></Icon>
        </button>
        <div ref={boxRef} className="message-sent">
          <div className="text-primary float-right ml-4 flex size-12 shrink-0 items-center justify-center rounded-full bg-white object-cover text-center text-3xl dark:bg-gray-700">
            <p>{props.author.username[0].toUpperCase()}</p>
          </div>
          <p className={`m-3 text-inherit ${boxWidth < 300 && 'flex'}`}>
            {props.body}
          </p>
        </div>
      </div>

      <p className="group-hover:text-tertiary text-right text-xs text-transparent transition duration-300">
        {format(props.date, 'pp')}
      </p>
    </div>
  );
};

export default MessageSent;
