import { useMutation, useQueryClient } from '@tanstack/react-query';
import createMessage from './createMessage';

const useCreateMessageMutation = (activeId, apiUrl) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (message) => createMessage(activeId, message, apiUrl),
    onSuccess: () => {
      queryClient.invalidateQueries(['chatInfo']);
    },
  });
};

export default useCreateMessageMutation;
