const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  registerForEvent,
  unregisterFromEvent,
  getUserRegistrations
} = require('../controllers/registrationController');

// All routes require authentication
router.use(auth);

// Register for event
router.post('/', registerForEvent);

// Unregister from event
router.delete('/:id', unregisterFromEvent);

// Get user registrations
router.get('/user', getUserRegistrations);

module.exports = router;