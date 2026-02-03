export default function EventCard({ event, onBook }) {
  console.log("data",event)
  // check event is zero
  const isSoldOut = event?.seats === 0;

  return (
    <div className="bg-[#f8f5f5] rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between border border-gray-100">

  {/* Event Information */}
  <div className="space-y-2">
    <h2 className="text-lg font-semibold text-gray-800">
      {event?.title}
    </h2>

    <p className="text-sm text-gray-500">
      <span className="font-medium text-gray-600">Date:</span> {event?.date} 📅
    </p>

    <p
      className={`text-sm font-semibold ${
        isSoldOut ? 'text-red-500' : 'text-green-600'
      }`}
    >
      Seats Available: {event?.seats}
    </p>
  </div>

  {/* Action */}
  <div className="mt-5">
    {isSoldOut ? (
      <span
        className="inline-block w-full text-center py-2 rounded-lg bg-red-100 text-red-600 font-semibold cursor-not-allowed"
        aria-disabled="true"
      >
        Sold Out
      </span>
    ) : (
      <button
        onClick={() => onBook(event)}
        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-2.5 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
      >
        Book Now
      </button>
    )}
  </div>

</div>

  );
}
