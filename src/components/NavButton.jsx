const NavButton = (props) => {
  return (
    <button
      className={`${props.children.toLowerCase() === props.activeTab ? 'accent-primary' : ''} text-primary rounded py-2 text-lg font-semibold`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default NavButton;
