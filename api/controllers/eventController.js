import { events } from '../data/events.js';
import { sendBookingEmail } from '../utils/mailer.js';



 const getEvents = (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginatedEvents = events.slice(start, end);

    res.status(200).json({
      data: paginatedEvents,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(events.length / limit),
        totalItems: events.length,
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events' });
  }
};

// POST /book
const bookEvent = (req, res) => {
  try {
    const { eventId, name, email } = req.body;
    const io = req.app.get('io');

    if (!eventId || !name || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const event = events.find(e => e.id === eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.seats <= 0) {
      return res.status(400).json({ message: 'Sold out' });
    }

    if (event.bookings.some(b => b.email === email)) {
      return res.status(409).json({ message: 'Duplicate booking not allowed' });
    }

    // update state
    event.seats--;
    event.bookings.push({ name, email });

    //  send mail
    // sendBookingEmail({
    //   to: email,
    //   name,
    //   eventTitle: event.title,
    //   date: event.date
    // });

    sendBookingEmail({
      to: email,
      name,
      eventTitle: event.title,
      date: event.date,
    }).catch(err => console.error('Email failed:', err.message));

    //  REAL-TIME EVENT (ID MATCH)
    io.emit('seatUpdated', {
      eventId: event.id,
      seats: event.seats
    });

    res.status(200).json({
      message: 'Booking successful',
      // eventId: event.id,
      // seats: event.seats
    });

  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export {getEvents,bookEvent}