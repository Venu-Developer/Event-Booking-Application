import express from 'express';
import { getEvents, bookEvent } from '../controllers/eventController.js';
const router = express.Router();
router.get('/events', getEvents);
router.post('/book', bookEvent);
export default router;