import handleResponse from '../handleResponse';

const addFriendToChat = async (friendId, activeId, apiUrl) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${apiUrl}/chats/${activeId}/members`, {
      method: 'PUT',
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
    throw error;
  }
};

export default addFriendToChat;
