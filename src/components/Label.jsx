import Icon from '@mdi/react';

const Label = (props) => {
  return (
    <button
      type="submit"
      className="group/button rounded-full p-1 transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-900"
      onClick={props.onClick}
    >
      <p className="group-hover/button:text-tertiary pointer-events-none absolute -translate-y-7 translate-x-7 text-nowrap rounded-md border-transparent p-1 text-sm text-transparent duration-300 group-hover/button:bg-gray-800">
        {props.label}
      </p>
      <Icon
        className={`${props.className} text-transparent transition duration-300`}
        path={props.icon}
        size={1.2}
      ></Icon>
    </button>
  );
};

export default Label;
