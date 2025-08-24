const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById
} = require('../controllers/eventController');

// @route   GET api/events
// @desc    Get all events
// @access  Public
router.get('/', getAllEvents);

// @route   GET api/events/:id
// @desc    Get event by ID
// @access  Public
router.get('/:id', getEventById);

// @route   POST api/events
// @desc    Create an event
// @access  Private (Admin only)
router.post('/', createEvent);

// @route   PUT api/events/:id
// @desc    Update an event
// @access  Private (Admin only)
router.put('/:id',  updateEvent);

// @route   DELETE api/events/:id
// @desc    Delete an event
// @access  Private (Admin only)
router.delete('/:id', deleteEvent);

module.exports = router;