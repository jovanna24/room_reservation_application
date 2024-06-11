const router = require('express').Router();
const { Room, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res)=> {
    try {
        const roomData = await Room.findAll({
            include: [
                {
                    model: User, 
                    attributes: ['name'],
                    // need to double check the User model attributes
                },
            ],
        });
        const rooms = roomData.map((project) => project.get({ plain: true }));

        res.render('homepage', {
            rooms, 
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/room/:id', async (req, res) => {
    try {
        const roomData = await Room.findByPk(req.params.id, {
            include: [
                {
                    model: User, 
                    attributes: ['name'],
                },
            ],
        });

        const room = roomData.get({ plain: true });

        res.render('room', {
            ...room,
            logged_in: req.session.logged_in
        }); 
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res)=>{
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] }, 
            include: [{ model: Room }],
        }); 
        const user = userData.get({ plain: true }); 

        res.render('profile', {
            ...user, 
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
}); 

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login');
}); 

module.exports = router;