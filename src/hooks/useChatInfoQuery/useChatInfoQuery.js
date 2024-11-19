import { useQuery } from '@tanstack/react-query';
import getChatInfo from './getChatInfo';

const useChatInfoQuery = (activeId, apiUrl) => {
  return useQuery({
    queryKey: ['chatInfo', activeId],
    queryFn: () => getChatInfo(activeId, apiUrl),
  });
};

export default useChatInfoQuery;
