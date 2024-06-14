const router = require("express").Router();
const { Event } = require("../../models");

router.post('/event-form', async (req, res) => {
  try {
    const { host, contact, title, description, reservation, room } = req.body;
    const newEvent = await Event.create(
      host,
      contact,
      title,
      description,
      reservation,
      room
    );
    res.json(newEvent);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occured while creating the event" });
  }
}); 

// GET route to retrieve all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the events' });
  }
});

// GET route to retrieve a specific event by ID
router.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the event' });
  }
});

// GET route to retrieve events by host
router.get('/events/host/:host', async (req, res) => {
  try {
    const events = await Event.findAll({ where: { host: req.params.host } });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the events' });
  }
});

// GET route to retrieve events by room
router.get('/events/room/:room', async (req, res) => {
  try {
    const events = await Event.findAll({ where: { room: req.params.room } });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving the events' });
  }
});

module.exports = router;
