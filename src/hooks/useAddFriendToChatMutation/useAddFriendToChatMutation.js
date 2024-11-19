import { useMutation, useQueryClient } from '@tanstack/react-query';
import addFriendToChat from './addFriendToChat';

const useAddFriendToChatMutation = (activeId, apiUrl) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (friendId) => addFriendToChat(friendId, activeId, apiUrl),
    onSuccess: () => {
      queryClient.invalidateQueries(['chats']);
    },
  });
};

export default useAddFriendToChatMutation;
