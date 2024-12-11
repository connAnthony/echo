const express = require("express");
const asyncHandler = require("express-async-handler");
const { Event } = require("../database");

const router = express.Router();

// Get all events, sorted by date
router.get("/events", asyncHandler(async (req, res) => {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
}));

// Get an event by ID
router.get("/id/:id", asyncHandler(async (req, res) => {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);

    if (event) {
        res.status(200).json(event);
    } else {
        res.status(404).json({ message: "Event not found" });
    }
}));

// Create a new event
router.post("/event/new", asyncHandler(async (req, res) => {
    const event = new Event({
        organizer: req.body.organizer,
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        title: req.body.title,
        description: req.body.description,
        contentURL: req.body.contentURL
    });

    await event.save();
    res.status(201).json(event);
}));

// Delete an event by ID
router.delete("/id/:id", asyncHandler(async (req, res) => {
    const id = req.params.id;
    const event = await Event.findByIdAndDelete(id);

    if (event) {
        res.status(200).json(event);
    } else {
        res.status(404).json({ message: "Event ID does not exist." });
    }
}));

// Delete an event by date
router.delete("/date/:date", asyncHandler(async (req, res) => {
    const eventDate = req.params.date;
    const event = await Event.findOneAndDelete({ date: eventDate });

    if (event) {
        res.status(200).json(event);
    } else {
        res.status(404).json({ message: "No event with such date exists." });
    }
}));

// Delete an event by title
router.delete("/title/:title", asyncHandler(async (req, res) => {
    const eventTitle = req.params.title;
    const event = await Event.findOneAndDelete({ title: eventTitle });

    if (event) {
        res.status(200).json(event);
    } else {
        res.status(404).json({ message: "Event title does not exist." });
    }
}));

module.exports = router;
