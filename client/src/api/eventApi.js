
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// export const fetchEvents = async () => {
//   try {
//     const res = await axios.get(`${API_URL}/events`);
//     return res?.data?.data;
//   } catch (error) {
//     throw new Error('Failed to load events');
//   }
// };

export const fetchEvents = async ({ page }) => {
  const res = await axios.get(
    `${API_URL}/events?page=${page}&limit=6`
  );
  return res.data;
};


export const bookEvent = async (payload) => {
  try {
    const res = await axios.post(`${API_URL}/book`, payload);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Booking failed');
  }
};
