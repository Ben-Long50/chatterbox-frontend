import handleResponse from '../handleResponse';

const deleteChat = async (chatId, apiUrl) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${apiUrl}/chats/${chatId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ chatId }),
    });
    const data = await handleResponse(response);
    console.log(data.message);
  } catch (error) {
    console.error(error);
  }
};

export default deleteChat;
