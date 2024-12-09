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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default addFriend;
