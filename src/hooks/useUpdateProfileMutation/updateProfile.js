const updateProfile = async (formData, currentUser, apiUrl) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${apiUrl}/users/${currentUser._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: formData.username,
        bio: formData.bio,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default updateProfile;
