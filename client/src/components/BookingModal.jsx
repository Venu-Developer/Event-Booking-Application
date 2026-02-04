import { useState } from 'react';


const BookingModal = ({ event, onSubmit, onClose, loading }) => {
  const [form, setForm] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    // remove error while typing
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};

    if (form.name.trim().length < 1) {
      newErrors.name = 'Name is required';
    }

    if (!isValidEmail(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(form);
  };

  return (
   <div className="fixed inset-0 bg-black/60 z-50 animate-fadeIn">
  <div className="relative w-full h-full overflow-y-auto flex justify-content items-center">

    {/* Content container */}
    <div className="relative bg-white mx-auto  h-fit
                    w-[95%] max-w-5xl 
                    px-6 py-10 sm:px-10">

      {/* Close icon */}
      <button
        onClick={onClose}
        className="absolute right-5 top-5 text-red-400 hover:text-red-600 rounded-full bg-slate-100 p-2"
      >
        X
      </button>

      <h2 className="text-4xl sm:text-5xl font-semibold text-gray-800">
        Book Event
      </h2>

      <p className="text-2xl sm:text-3xl text-gray-500 mb-6 mt-2">
        {event.title}
      </p>

      {/* Name */}
      <div className="mb-4">
        <input
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 text-2xl
            ${errors.name
              ? 'border-red-500 focus:ring-red-400'
              : 'border-gray-300 focus:ring-blue-400'}
          `}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="mb-6">
        <input
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 text-2xl
            ${errors.email
              ? 'border-red-500 focus:ring-red-400'
              : 'border-gray-300 focus:ring-blue-400'}
          `}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium disabled:opacity-50 text-2xl"
      >
        {loading ? 'Booking...' : 'Confirm Booking'}
      </button>

    </div>
  </div>
</div>


  );
};

export default BookingModal;
