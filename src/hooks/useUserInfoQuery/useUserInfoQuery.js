import { useQuery } from '@tanstack/react-query';
import getUserInfo from './getUserInfo';

const useUserInfoQuery = (userId, apiUrl) => {
  return useQuery({
    queryKey: ['userInfo', userId],
    queryFn: () => getUserInfo(userId, apiUrl),
  });
};

export default useUserInfoQuery;
