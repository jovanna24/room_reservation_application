const router = require('express').Router();
const { Room, User, Event } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res)=> {
    try {
        const eventData = await Event.findAll({
            include: [
                {
                    model: User, 
                    attributes: ['id'],
                },
                {
                    model: Room, 
                    include: {
                        model: User, 
                        attributes: ['name'],
                    },
                }
            ],
        });
        const events = eventData.map((event) => event.get({ plain: true }));

        res.render('homepage', {
            events, 
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.error('Error fetching homepage data:', err);
        res.status(500).json(err);
    }
});
// route to get an individual event
router.get('/event/:id', async (req, res) => {
    try {
        const eventData = await Room.findByPk(req.params.id, {
            include: [
                {
                    model: User, 
                    attributes: ['id'],
                },
                {
                    model: Room, 
                    include: {
                        model: User, 
                        attributes: ['name']
                    }
                }
            ],
        });
        if (!eventData){
            res.status(404).json({ message: 'No events found with this id!' });
        }
        const event = eventData.get({ plain: true });
        console.log(event); 
        res.render('event', {
            event, 
            logged_in: req.session.logged_in
        }); 
     } catch(err) {
            console.error('Error fetching event data: ', err);
            res.status(500).json(err);
        } 

    });

// route to get profile
router.get('/profile', withAuth, async (req, res)=>{
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] }, 
            include: [
                { 
                    model: Event, 
                    include: {
                        model: Room, 
                        include: {
                            model: User, 
                            attributes: ['name'],
                        },
                },
            },
        ],
        }); 
        if (!userData) {
            res.status(404).json({  message: 'No user found with this id!' });
            return;
        }
        const user = userData.get({ plain: true }); 

        res.render('profile', {
            ...user, 
            logged_in: true
        });
    } catch (err) {
        console.error('Error fetching profile data:', err);
        res.status(500).json(err);
    }
}); 

// route for login 
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login');
}); 

module.exports = router;