import express from 'express';
import { getUserBookings, createBooking, cancelBooking } from '../controllers/BookingController.js';

const router = express.Router();

// Get user's bookings
router.get('/bookings/:userId', getUserBookings);

// Create a new booking
router.post('/createbook', createBooking);

// Cancel a booking
router.delete('/cancelbook/:bookingId', cancelBooking);

export default router; 