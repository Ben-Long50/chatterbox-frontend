import { useMutation, useQueryClient } from '@tanstack/react-query';
import addFriend from './addFriend';

const useAddFriendMutation = (currentUser, apiUrl) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newFriendId) => addFriend(newFriendId, currentUser, apiUrl),
    onSuccess: () => {
      queryClient.invalidateQueries(['friends', 'members']);
    },
  });
};

export default useAddFriendMutation;
