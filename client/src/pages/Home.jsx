import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useEvents } from '../hooks/useEvents';
import { useSocket } from '../hooks/useSocket';
import { bookEvent } from '../api/eventApi';

import EventCard from '../components/EventCard';
import BookingModal from '../components/BookingModal';

export default function Home() {
  // pagination state
  const [page, setPage] = useState(1);

  // fetch paginated events
  const { data, isLoading, isError } = useEvents(page);

  // real-time socket updates
  useSocket();

  // modal state
  const [selected, setSelected] = useState(null);

  // extracted data
  const events = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  // booking mutation
  const mutation = useMutation({
    mutationFn: bookEvent,
    onSuccess: () => {
      toast.success('Booking confirmed');
      setSelected(null);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  if (isLoading) return <p>Loading events...</p>;
  if (isError) return <p>Failed to load events</p>;

  return (
    <div className="space-y-6 mt-5 md:mt-10">

      {/* Events Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2  gap-5">
        {events.length > 0 ? (
          events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onBook={setSelected}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No events available
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm font-medium">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 rounded bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Booking Modal */}
      {selected && (
        <BookingModal
          event={selected}
          loading={mutation.isLoading}
          onClose={() => setSelected(null)}
          onSubmit={(formData) =>
            mutation.mutate({
              eventId: selected.id,
              ...formData
            })
          }
        />
      )}
    </div>
  );
}
