import { useMutation } from '@tanstack/react-query';
import deleteProfile from './deleteProfile';
import { useNavigate } from 'react-router-dom';

const useDeleteProfileMutation = (currentUser, apiUrl, signout) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => deleteProfile(currentUser, apiUrl),
    onSuccess: () => {
      signout();
      navigate('/signin');
    },
  });
};

export default useDeleteProfileMutation;
