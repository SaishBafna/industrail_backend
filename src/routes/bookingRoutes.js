import express from "express";
import { Booking } from "../models/Booking.js";
import { Event } from "../models/Event.js";

const router = express.Router();

// POST create booking
router.post("/", async (req, res) => {
  try {
    const { eventId, name, email } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.bookedSeats >= event.totalSeats) {
      return res.status(400).json({ message: "No seats available" });
    }

    const booking = await Booking.create({
      event: eventId,
      name,
      email
    });

    event.bookedSeats += 1;
    await event.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: "Failed to create booking", error: error.message });
  }
});

// GET bookings for an event (for admin)
router.get("/event/:eventId", async (req, res) => {
  try {
    const bookings = await Booking.find({ event: req.params.eventId })
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
  }
});

export default router;
