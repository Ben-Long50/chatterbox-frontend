import handleResponse from '../handleResponse';

const removeFriend = async (friendId, currentUser, apiUrl) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${apiUrl}/users/${currentUser._id}/friends`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ friendId }),
    });
    const data = await handleResponse(response);
    console.log(data.message);
  } catch (error) {
    console.error(error);
  }
};

export default removeFriend;
