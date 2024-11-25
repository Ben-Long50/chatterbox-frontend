import { mdiDotsHorizontal } from '@mdi/js';
import Icon from '@mdi/react';

const SettingsMenu = (props) => {
  return (
    <div id={props.id} className="relative p-2">
      <Icon
        onClick={(e) => {
          e.stopPropagation();
          props.setVisibleMenuId(props.id);
        }}
        path={mdiDotsHorizontal}
        size={1}
      />
      <ul
        className={`${props.className} ${props.visibleMenuId === props.id ? 'pointer-events-auto opacity-100' : 'pointer-events-none -translate-x-5 opacity-0'} timing bg-secondary absolute right-full top-0 flex flex-col gap-1 rounded p-1 shadow-md dark:shadow-black`}
      >
        {props.children}
      </ul>
    </div>
  );
};

export default SettingsMenu;
