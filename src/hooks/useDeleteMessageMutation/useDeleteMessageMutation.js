import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteMessage from './deleteMessage';

const useDeleteMessageMutation = (messageId, chatId, currentUser, apiUrl) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteMessage(messageId, chatId, currentUser, apiUrl),
    onSuccess: () => {
      queryClient.invalidateQueries(['chatInfo']);
    },
  });
};

export default useDeleteMessageMutation;
