import handleResponse from '../handleResponse';

const removeFromChat = async (chatId, memberId, apiUrl) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${apiUrl}/chats/${chatId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ chatId, memberId }),
    });
    const data = await handleResponse(response);

    console.log(data.message);
  } catch (error) {
    console.error(error);
  }
};

export default removeFromChat;
