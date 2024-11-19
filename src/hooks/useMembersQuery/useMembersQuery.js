import { useQuery } from '@tanstack/react-query';
import getMembers from './getMembers';

const useMembersQuery = (currentUser, apiUrl) => {
  return useQuery({
    queryKey: ['members'],
    queryFn: () => {
      const members = getMembers(currentUser, apiUrl);
      return members ? members : [];
    },
  });
};

export default useMembersQuery;
