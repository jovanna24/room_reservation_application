const router = require("express").Router();
const { Event } = require("../../models");
const withAuth = require('../../utils/auth');
const { sendReminderEmail } = require('../../services/emailService');

// get all events
router.get('/', withAuth, async (req, res)=> {
  try {
    const eventData = await Event.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User, 
          attributes: ['name'],
          as: 'user'
        },
      ],
    });
    const events = eventData.map((event) => event.get({ plain: true }));
    res.render('profile', {
      events, 
      logged_in: req.session.logged_in,
    }); 
  } catch (err) {
    console.error(err);
    res.status(500).json(err)
  }
}); 

// Route to create a new event

router.post('/', withAuth, async (req, res) => {
  try {
    const { title, room_id, description, contact, host, reservation } = req.body;

    // Validate incoming data
    if (!title||!room_id||!description || !contact || !host || !reservation) {
      return res.status(400).json({ error: 'All fields are required!' });
    }
    const newEvent = await Event.create({
      title, 
      room_id,
      description,
      contact,
      host,
      reservation,
      user_id: req.session.user_id,
    });
    if (req.body.sendReminder) {
      await sendReminderEmail(req.body); 
    }

    res.status(200).json(newEvent);
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(400).json({ error: `Failed to create event! ${errorData.error}` });
  }
});





// route to retrieve an event based on event id
router.get('/event/:id', withAuth, async (req, res)=> {
  try{
    const eventData = await Event.findByPk(req.params.id, {
      include: [
        {
          model: User, 
          attributes: ['name'],
          as: 'user',
        },
        {
          model: Room,
          as: 'rooms',
          include: {
              model: User,
              attributes: ['name'],
              as: 'user'
          }
      }
      ],
    });
    if(!eventData) {
      res.status(404).json({ message: 'No event found with this id.'});
      return;
    } 
    const event = eventData.get({ plain: true });
    console.log(event)
    res.render('event', {
      event, 
      logged_in: req.session.logged_in,
    }); 
  }catch(err) {
      res.status(500).json(err);
    }
});

// route to delet event by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const eventData = await Event.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!eventData) {
      res.status(404).json({ message: 'No event found with this id!' });
      return;
    }

    res.status(200).json(eventData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
