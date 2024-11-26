import ScrollBar from 'react-perfect-scrollbar';
import { Link } from 'react-router-dom';
import Label from './Label';
import { mdiAccountPlus, mdiPlus } from '@mdi/js';
import { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { io } from 'socket.io-client';
import Loading from './Loading';
import useMembersQuery from '../hooks/useMembersQuery/useMembersQuery';
import useAddFriendMutation from '../hooks/useAddFriendMutation/useAddFriendMutation';
import { useQueryClient } from '@tanstack/react-query';
import SettingsMenu from './SettingsMenu';

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
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const socket = io(apiUrl, {
      query: { token },
    });

    socketRef.current = socket;

    socket.on('removeMember', () => {
      queryClient.invalidateQueries(['members']);
    });

    socket.on('addMember', () => {
      queryClient.invalidateQueries(['members']);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUser._id]);

  const handleChange = () => {
    if (inputRef.current.value == '') {
      setFilteredMembers(members.data);
    } else {
      const filteredMembers = members.data.filter((member) => {
        return member.username
          .toLowerCase()
          .includes(inputRef.current.value.toLowerCase());
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
                  <SettingsMenu
                    id={member._id}
                    visibleMenuId={props.visibleMenuId}
                    setVisibleMenuId={props.setVisibleMenuId}
                  >
                    <Label
                      label="Add as friend"
                      icon={mdiAccountPlus}
                      onClick={(e) => {
                        e.stopPropagation();
                        addFriend.mutate(member._id, currentUser);
                      }}
                    />
                  </SettingsMenu>
                </li>
              );
            })}
        </ScrollBar>
      )}
    </>
  );
};

export default MemberList;
