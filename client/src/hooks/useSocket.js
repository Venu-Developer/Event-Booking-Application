import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { socket } from '../socket';

export const useSocket = () => {
  const qc = useQueryClient();

  useEffect(() => {
    socket.on('seatUpdated', ({ eventId, seats }) => {
      qc.setQueriesData(
        { queryKey: ['events'] },
        oldData => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData.data.map(event =>
              event.id === eventId
                ? { ...event, seats }
                : event
            )
          };
        }
      );
    });

    return () => socket.off('seatUpdated');
  }, [qc]);
};
