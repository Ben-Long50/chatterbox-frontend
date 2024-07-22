const ProfilePic = (props) => {
  return (
    <div
      className={`text-primary -my-3 -ml-2 flex ${props.className} items-center justify-center rounded-full bg-gray-300 object-cover text-center text-2xl dark:bg-gray-700`}
    >
      <p>{props.username[0].toUpperCase()}</p>
    </div>
  );
};

export default ProfilePic;
