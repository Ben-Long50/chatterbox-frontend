import { useMutation, useQueryClient } from '@tanstack/react-query';
import deleteChat from './deleteChat';

const useDeleteChatMutation = (apiUrl) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chatId) => deleteChat(chatId, apiUrl),
    onSuccess: () => {
      queryClient.invalidateQueries(['chats']);
    },
  });
};

export default useDeleteChatMutation;
