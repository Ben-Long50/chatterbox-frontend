import { useMutation, useQueryClient } from '@tanstack/react-query';
import removeFriend from './removeFriend';

const useRemoveFriendMutation = (currentUser, apiUrl) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (friendId) => removeFriend(friendId, currentUser, apiUrl),
    onSuccess: () => {
      queryClient.invalidateQueries(['friends']);
    },
  });
};

export default useRemoveFriendMutation;
