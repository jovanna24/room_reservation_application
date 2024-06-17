const router = require('express').Router(); 
const { User } = require('../../models'); 
const sendMail = require('../../utils/mailer');

// route for user registration
router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Error during registration', error: err });
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

// route for sending an email
router.post('/send-email', async (req, res) => {
    try {
        await sendMail({
            from: 'sender@example.com', // Replace with valid sender email address
            to: 'receiver@example.com', // Replace with valid receiver email address
            subject: "Hello ✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>",
        });

        res.send('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

// route for getting user details
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);
        if (!userData) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error fetching user: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// route for checking if user exists by email
router.get('/check-email/:email', async (req, res) => {
    try {
        const existingUser = await User.findOne({ where: { email: req.params.email } });
        if (existingUser) {
            res.status(200).json({ exists: true });
        } else {
            res.status(404).json({ exists: false });
        }
    } catch (error) {
        console.error('Error checking email: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;