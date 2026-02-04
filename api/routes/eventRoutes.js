import express from 'express';
import { getEvents, bookEvent } from '../controllers/eventController.js';
import { validateBooking } from '../middlewares/validateBooking.js';


const router = express.Router();
// GET events
router.get('/events', getEvents);

// POST book with validation middleware
router.post('/book', validateBooking, bookEvent);

export default router;
