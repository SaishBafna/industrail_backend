import express from "express";
import { Event } from "../models/Event.js";

const router = express.Router();

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events", error: error.message });
  }
});

// GET single event by id
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch event", error: error.message });
  }
});

// POST create event (for admin)
router.post("/", async (req, res) => {
  try {
    const { title, description, date, location, totalSeats } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      location,
      totalSeats
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: "Failed to create event", error: error.message });
  }
});

// PUT update event
router.put("/:id", async (req, res) => {
  try {
    const { title, description, date, location, totalSeats } = req.body;

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, date, location, totalSeats },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(400).json({ message: "Failed to update event", error: error.message });
  }
});

// DELETE event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event", error: error.message });
  }
});

export default router;
