import handleResponse from '../handleResponse';

const createMessage = async (activeId, message, apiUrl) => {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${apiUrl}/chats/${activeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(message),
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default createMessage;
