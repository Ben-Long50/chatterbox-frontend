import { format } from 'date-fns';
import { useRef, useState, useEffect } from 'react';

const MessageReceived = (props) => {
  const [boxWidth, setBoxWidth] = useState(null);
  const boxRef = useRef(null);

  useEffect(() => {
    const boxRect = boxRef.current.getBoundingClientRect();
    setBoxWidth(boxRect.width);
  }, []);

  return (
    <div className="group mb-1 flex flex-col self-start">
      <p className="text-tertiary text-left text-xs">{props.author.username}</p>
      <div ref={boxRef} className="message-received">
        <div className="text-primary float-left mr-4 flex size-12 shrink-0 items-center justify-center self-start rounded-full bg-white object-cover text-center text-3xl dark:bg-gray-700">
          <p>{props.author.username[0].toUpperCase()}</p>
        </div>
        <p className={`m-3 text-inherit ${boxWidth < 300 && 'flex'}`}>
          {props.body}
        </p>
      </div>
      <p className="text-tertiary invisible text-left text-xs group-hover:visible">
        {format(props.date, 'pp')}
      </p>
    </div>
  );
};

export default MessageReceived;
