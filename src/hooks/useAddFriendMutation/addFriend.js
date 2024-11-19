import handleResponse from '../handleResponse';

const addFriend = async (newFriendId, currentUser, apiUrl) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiUrl}/users/${currentUser._id}/friends`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ newFriendId }),
    });
    const data = handleResponse(response);
    console.log(data.message);
  } catch (error) {
    console.error(error);
  }
};

export default addFriend;