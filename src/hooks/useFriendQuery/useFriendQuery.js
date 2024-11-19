import { useQuery } from '@tanstack/react-query';
import getFriends from './getFriends';

const useFriendQuery = (currentUser, apiUrl) => {
  return useQuery({
    queryKey: ['friends'],
    queryFn: () => {
      const friends = getFriends(currentUser, apiUrl);
      return friends ? friends : [];
    },
  });
};

export default useFriendQuery;
