import { useMutation, useQueryClient } from '@tanstack/react-query';
import removeFromChat from './removeFromChat';

const useRemoveFromChatMutation = (apiUrl) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (chatInfo) => {
      removeFromChat(chatInfo.chatId, chatInfo.memberId, apiUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['chats']);
    },
  });
};

export default useRemoveFromChatMutation;
