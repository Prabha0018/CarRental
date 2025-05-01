import Books from '../models/Bookmodel.js';

// Get bookings for a specific user
export const getUserBookings = async (req, res) => {
    try {
        const { userId } = req.params;
        const bookings = await Books.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Error fetching bookings' });
    }
};

// Create a new booking
export const createBooking = async (req, res) => {
    try {
        const { Regno, Hours, Date, CheckinTime, Aadhar, userId, userEmail, Name, Carimg } = req.body;
        const newBooking = new Books({
            Regno,
            Hours,
            Date,
            CheckinTime,
            Aadhar,
            userId,
            userEmail,
            Name,
            Carimg
        });
        await newBooking.save();
        res.status(200).send('Car Booked Successfully');
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).send('Error occurred while booking');
    }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        await Books.findByIdAndDelete(bookingId);
        res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.status(500).json({ message: 'Error cancelling booking' });
    }
}; 