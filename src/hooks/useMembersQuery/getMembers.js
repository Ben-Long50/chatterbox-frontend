import handleResponse from '../handleResponse';

const getMembers = async (currentUser, apiUrl) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${apiUrl}/users?userId=${currentUser._id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await handleResponse(response);
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getMembers;
