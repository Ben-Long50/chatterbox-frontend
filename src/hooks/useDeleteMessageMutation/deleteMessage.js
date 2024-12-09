const deleteMessage = async (messageId, chatId, currentUser, apiUrl) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `${apiUrl}/chats/${chatId}/messages/${messageId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: currentUser._id }),
      },
    );
    const result = await response.json();
    console.log(result.message);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deleteMessage;
