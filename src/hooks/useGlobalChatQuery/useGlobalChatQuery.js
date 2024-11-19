import { useQuery } from '@tanstack/react-query';
import getGlobalChat from './getGlobalChat';

const useGlobalChatQuery = (apiUrl) => {
  return useQuery({
    queryKey: ['globalChat'],
    queryFn: () => getGlobalChat(apiUrl),
  });
};

export default useGlobalChatQuery;
