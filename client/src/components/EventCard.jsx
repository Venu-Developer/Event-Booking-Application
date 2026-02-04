export default function EventCard({ event, onBook }) {
  console.log("data", event);
  
  // Check if event is null/undefined or seats are zero
  const isSoldOut = !event || event?.seats === 0;
  

  return (
    <div 
      className="bg-[#f8f5f5] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between border border-gray-100"
      role="article"
      aria-label={`Event: ${event.title}`}
    >
      {/* Event Information */}
      <div className="space-y-4 md:space-y-6">
        <h2 className="text-2xl md:text-3xl  font-semibold text-gray-800 line-clamp-2">
          {event.title}
        </h2>

        <div className="space-y-2">
          <p className="text-2xl md:text-3xl  text-gray-600 flex items-center gap-2">
            <span className="font-medium">Date:</span> 
            {event.date}
            
          </p>

          <p 
            className={` text-2xl md:text-3xl font-semibold ${
              isSoldOut ? 'text-red-500' : 'text-green-600'
            }`}
            aria-live="polite"
          >
            Seats Available: {event.seats}
            {isSoldOut && (
              <span className="sr-only">This event is sold out</span>
            )}
          </p>
        </div>
      </div>

      {/* Action */}
      <div className="w-full flex justify-center ">
        <div className="mt-3 md:mt-5">
        {isSoldOut ? (
          <button
            disabled
            className="w-full py-2 rounded-lg bg-red-100 text-red-600 font-semibold cursor-not-allowed transition-colors text-xl px-3"
            aria-label="Sold out - no seats available"
          >
            Sold Out
          </button>
        ) : (
          <button
            onClick={() => onBook(event)}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-2xl px-3"
            aria-label={`Book tickets for ${event.title}`}
          >
            Book Now
          </button>
        )}
      </div>

      </div>
      
    </div>
  );
}