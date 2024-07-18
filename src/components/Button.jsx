const Button = (props) => {
  return (
    <button
      className={`${props.className} rounded bg-yellow-200 p-2 text-gray-900 hover:bg-yellow-300`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
