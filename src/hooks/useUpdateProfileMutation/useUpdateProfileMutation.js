import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateProfile from './updateProfile';

const useUpdateProfileMutation = (currentUser, apiUrl) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => updateProfile(formData, currentUser, apiUrl),
    onSuccess: () => {
      queryClient.invalidateQueries(['userInfo']);
    },
  });
};

export default useUpdateProfileMutation;
