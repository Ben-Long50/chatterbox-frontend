import { useMutation, useQueryClient } from '@tanstack/react-query';
import createChat from './createChat';

const useCreateChatMutation = (apiUrl) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chat) => createChat(chat, apiUrl),
    onSuccess: () => {
      queryClient.invalidateQueries(['chats']);
    },
  });
};

export default useCreateChatMutation;
