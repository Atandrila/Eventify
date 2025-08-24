const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ error: 'Event not found' });
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Create a new event
// @route   POST /api/events
// @access  Public
exports.createEvent = async (req, res) => {
  try {
    const { title, description, category, date, time, location, maxParticipants, image, status } = req.body;

    const newEvent = new Event({
      title,
      description,
      category,
      date,
      time,
      location,
      maxParticipants,
      image,
      status: status || 'upcoming',
      createdBy: null // can be replaced if auth is implemented
    });

    const event = await newEvent.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Public
exports.updateEvent = async (req, res) => {
  try {
    const eventFields = {};
    const allowedFields = ['title', 'description', 'category', 'date', 'time', 'location', 'maxParticipants', 'image', 'status'];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) eventFields[field] = req.body[field];
    });

    let event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    event = await Event.findByIdAndUpdate(req.params.id, { $set: eventFields }, { new: true, runValidators: true });
    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ error: 'Event not found' });
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Public
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    await event.remove(); // removes the document
    res.json({ message: 'Event removed successfully', deletedEvent: event });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ error: 'Event not found' });
    res.status(500).json({ error: 'Server error' });
  }
};
