import Icon from '@mdi/react';

const Label = (props) => {
  return (
    <button
      type="submit"
      className={`${props.buttonClass} text-secondary flex items-center gap-2 whitespace-nowrap rounded p-2 transition duration-300 lg:hover:bg-gray-100 lg:dark:hover:bg-gray-900`}
      onClick={props.onClick}
    >
      <Icon
        className={`${props.iconClass} shrink-0 text-inherit`}
        path={props.icon}
        size={1}
      />
      {props.label}
    </button>
  );
};

export default Label;
