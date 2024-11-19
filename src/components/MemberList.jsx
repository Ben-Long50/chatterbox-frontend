import ScrollBar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';
import Label from './Label';
import { mdiPlus } from '@mdi/js';
import { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { io } from 'socket.io-client';
import Loading from './Loading';
import useMembersQuery from '../hooks/useMembersQuery/useMembersQuery';
import useAddFriendMutation from '../hooks/useAddFriendMutation/useAddFriendMutation';

const MemberList = (props) => {
  const { apiUrl, currentUser } = useContext(AuthContext);
  const members = useMembersQuery(currentUser, apiUrl);
  const [filteredMembers, setFilteredMembers] = useState([]);

  useEffect(() => {
    setFilteredMembers(members?.data);
  }, [members.data]);

  const inputRef = useRef(null);
  const socketRef = useRef(null);

  const addFriend = useAddFriendMutation(currentUser, apiUrl);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const socket = io(apiUrl, {
      query: { token },
    });

    socketRef.current = socket;

    socket.on('removeMember', ({ newFriend, user }) => {
      if (user._id === currentUser._id) {
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member._id !== newFriend._id),
        );
        setFilteredMembers((prevFiltered) =>
          prevFiltered.filter((member) => member._id !== newFriend._id),
        );
      }
      if (newFriend._id === currentUser._id) {
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member._id !== user._id),
        );
        setFilteredMembers((prevFiltered) =>
          prevFiltered.filter((member) => member._id !== user._id),
        );
      }
    });

    socket.on('addMember', ({ oldFriend, user }) => {
      if (user._id === currentUser._id) {
        setMembers((prevMembers) => [...prevMembers, oldFriend]);
        setFilteredMembers((prevFiltered) => [...prevFiltered, oldFriend]);
      }
      if (oldFriend._id === currentUser._id) {
        setMembers((prevFriends) => [...prevFriends, user]);
        setFilteredMembers((prevFiltered) => [...prevFiltered, user]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser._id]);

  const handleChange = () => {
    if (inputRef.current.value == '') {
      setFilteredMembers(members);
    } else {
      const filteredMembers = members.filter((member) => {
        return member.username
          .toLowerCase()
          .startsWith(inputRef.current.value.toLowerCase());
      });
      setFilteredMembers(filteredMembers);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        className="text-primary mx-4 my-2 rounded bg-gray-200 p-2 dark:bg-gray-700"
        type="text"
        placeholder="Search members"
        onChange={handleChange}
      />
      {members.isLoading || members.isPending ? (
        <Loading />
      ) : (
        <ScrollBar className="my-2 flex grow flex-col gap-2 overflow-y-auto px-4">
          {filteredMembers?.length > 0 &&
            filteredMembers.map((member) => {
              return (
                <li
                  key={member._id}
                  className={`list-secondary group/user flex items-center ${props.activeId === member._id && 'accent-primary'}`}
                >
                  <Link
                    to={`/users/${member.username}`}
                    id={member._id}
                    className="box-border flex flex-grow items-center gap-4 p-3"
                    state={{ userId: member._id }}
                    onClick={() => {
                      props.handleId(member._id);
                      props.hideSidebar();
                    }}
                  >
                    <div className="text-primary -my-3 -ml-2 flex size-10 items-center justify-center rounded-full bg-gray-300 object-cover text-center text-2xl dark:bg-gray-700">
                      <p>{member.username[0].toUpperCase()}</p>
                    </div>
                    <p>{member.username}</p>
                  </Link>
                  <Label
                    buttonClass={`${props.activeId === member._id && 'group-hover/user:text-gray-900 dark:hover:bg-yellow-200 hover:bg-yellow-200'} group-hover/user:text-secondary`}
                    labelClass={'-translate-x-full'}
                    label="Add friend"
                    icon={mdiPlus}
                    onClick={(e) => {
                      e.stopPropagation();
                      addFriend.mutate(member._id, currentUser);
                    }}
                  />
                </li>
              );
            })}
        </ScrollBar>
      )}
    </>
  );
};

export default MemberList;
