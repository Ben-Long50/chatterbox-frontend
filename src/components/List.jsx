import Icon from '@mdi/react';
import { mdiChevronUp } from '@mdi/js';
import { useEffect, useRef, useState } from 'react';

const List = (props) => {
  const [listOpen, setListOpen] = useState(false);
  const [listHeight, setListHeight] = useState(null);

  const listRef = useRef(null);
  const detailRef = useRef(null);

  useEffect(() => {
    const closeList = (e) => {
      if (listOpen && e.target !== detailRef.current) {
        setListOpen(false);
      }
    };
    window.addEventListener('click', closeList);
    return () => {
      window.removeEventListener('click', closeList);
    };
  }, [detailRef]);

  useEffect(() => {
    setListHeight(listRef.current.scrollHeight);
  }, []);

  const toggleList = () => {
    setListOpen(!listOpen);
  };

  return (
    <>
      <ul
        ref={listRef}
        className={`${!listOpen ? 'invisible opacity-0' : `opacity-100`} timing mt-2 flex flex-col gap-1 px-4`}
        style={{ height: listOpen ? `${listHeight}px` : '0' }}
      >
        {props.children}
      </ul>
      <div
        ref={detailRef}
        className={`${props.className} text-secondary list-primary z-10 m-2 flex items-center justify-between`}
        onClick={toggleList}
      >
        <span className="text-lg font-medium"> {props.heading} </span>
        <span className={`${listOpen && 'rotate-180'} timing shrink-0`}>
          <Icon
            path={mdiChevronUp}
            size={1.1}
            className={`text-secondary`}
          ></Icon>
        </span>
      </div>
    </>
  );
};

export default List;
