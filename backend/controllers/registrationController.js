const Registration = require('../models/Registration');
const Event = require('../models/Event');

// @desc Register for an event
exports.registerForEvent = async (req, res) => {
  const { eventId } = req.body;

  try {
    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user already registered
    const existing = await Registration.findOne({ 
      event: eventId, 
      user: req.user.id 
    });
    
    if (existing) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    // Check if event has available spots
    const registrationCount = await Registration.countDocuments({ event: eventId });
    if (registrationCount >= event.maxParticipants) {
      return res.status(400).json({ message: 'Event is full' });
    }

    // Create registration
    const registration = new Registration({
      event: eventId,
      user: req.user.id,
    });

    await registration.save();
    
    // Increment registered count in event
    await Event.findByIdAndUpdate(eventId, { 
      $inc: { registered: 1 } 
    });
    
    // Populate event details in response
    await registration.populate('event');
    
    res.status(201).json({ 
      message: 'Registered successfully', 
      registration 
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Unregister from an event
exports.unregisterFromEvent = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    if (registration.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Decrement registered count in event
    await Event.findByIdAndUpdate(registration.event, {
      $inc: { registered: -1 }
    });

    await registration.deleteOne();
    res.json({ message: 'Unregistered successfully' });
  } catch (err) {
    console.error('Unregistration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc Get current user's registrations
exports.getUserRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user.id })
      .populate({
        path: 'event',
        select: 'title description date time location image category status maxParticipants'
      });
      
    res.json(registrations);
  } catch (err) {
    console.error('Get registrations error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};