import handleResponse from '../handleResponse';

const createChat = async (chat, apiUrl) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${apiUrl}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(chat),
    });
    const data = await handleResponse(response);
    console.log(data.message);
  } catch (error) {
    console.error(error);
  }
};

export default createChat;
