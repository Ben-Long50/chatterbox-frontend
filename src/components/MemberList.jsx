import List from './List';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';
import { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from './AuthContext';

const MemberList = (props) => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const { apiUrl, userId } = useContext(AuthContext);

  const inputRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/users`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setMembers(data);
          setFilteredMembers(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

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

  const addUserAsFriend = async (newFriendId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${apiUrl}/users/${userId}/friends`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newFriendId }),
      });
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <List heading="All Members">
      <input
        ref={inputRef}
        className="text-primary my-2 w-full rounded bg-gray-200 p-2 dark:bg-gray-700"
        type="text"
        placeholder="Search members"
        onChange={handleChange}
      />
      {filteredMembers.map((member) => {
        return (
          <li
            key={member._id}
            className={`list-secondary group/user flex items-center ${props.activeItem === member.username && 'accent-primary'}`}
          >
            <Link
              to={`/users/${member.username}`}
              id={member._id}
              className="box-border flex flex-grow items-center gap-4 p-3"
              state={{ member }}
              onClick={() =>
                props.handleClick(
                  { currentTarget: member.username },
                  member._id,
                )
              }
            >
              <div className="text-primary -my-3 -ml-2 flex size-10 items-center justify-center rounded-full bg-gray-300 object-cover text-center text-2xl dark:bg-gray-700">
                <p>{member.username[0].toUpperCase()}</p>
              </div>
              <p>{member.username}</p>
            </Link>
            <button
              type="submit"
              className="rounded-full p-1 transition duration-300 hover:bg-gray-100 dark:hover:bg-gray-900"
              onClick={() => addUserAsFriend(member._id)}
            >
              <Icon
                className="group-hover/user:text-secondary text-transparent transition duration-300"
                path={mdiPlus}
                size={1.2}
              ></Icon>
            </button>
          </li>
        );
      })}
    </List>
  );
};

export default MemberList;
