import handleResponse from '../handleResponse';

const getChats = async (currentUser, apiUrl) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${apiUrl}/users/${currentUser._id}/chats`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await handleResponse(response);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getChats;
