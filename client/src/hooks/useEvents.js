// import { useQuery } from '@tanstack/react-query';
// import { fetchEvents } from '../api/eventApi';

// export const useEvents = () =>
//   useQuery({ 
//     queryKey: ['events'], 
//     queryFn: fetchEvents 
//   });

import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../api/eventApi';

export const useEvents = (page) => {
  return useQuery({
    queryKey: ['events', page], // 🔥 page-based cache
    queryFn: () => fetchEvents({ page }),
    keepPreviousData: true, // smooth UX
  });
};
