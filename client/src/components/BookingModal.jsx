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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-sm p-6 relative">

        {/* Close icon */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-red-600"
        >
          {/* <X size={18} /> */} X
        </button>

        <h2 className="text-lg font-semibold text-gray-800">
          Book Event
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {event.title}
        </p>

        {/* Name */}
        <div className="mb-3">
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2
              ${errors.name ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}
            `}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2
              ${errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'}
            `}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium disabled:opacity-50"
        >
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
