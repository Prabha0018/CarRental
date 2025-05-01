import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    Name: String,
    Carimg: String,
    Regno: String,
    Hours: Number,
    Date: Date,
    CheckinTime: String,
    Aadhar: String,
    userId: String,
    userEmail: String
}, {
    timestamps: true
});

const Books = mongoose.model("Booking", BookingSchema);

export default Books;
