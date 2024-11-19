import { useQuery } from '@tanstack/react-query';
import getChats from './getChats';

const useChatQuery = (currentUser, apiUrl) => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: () => getChats(currentUser, apiUrl),
  });
};

export default useChatQuery;
