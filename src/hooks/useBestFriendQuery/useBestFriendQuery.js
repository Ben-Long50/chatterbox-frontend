import { useQuery } from '@tanstack/react-query';
import getBestFriends from './getBestFriends';

const useBestFriendQuery = (userId, apiUrl) => {
  return useQuery({
    queryKey: ['bestFriends', userId],
    queryFn: () => getBestFriends(userId, apiUrl),
  });
};

export default useBestFriendQuery;
