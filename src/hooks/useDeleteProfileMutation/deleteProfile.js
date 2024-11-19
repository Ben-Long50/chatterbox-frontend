const deleteProfile = async (currentUser, apiUrl) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${apiUrl}/users/${currentUser._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error(error);
  }
};

export default deleteProfile;
