const router = require('express').Router(); 
const { User } = require('../../models'); 
const sendMail = require('../../utils/mailer');

// route for user registration
router.post('/users', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(()=> {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        }); 
    } catch (err) { 
        console.error(err);
        res.status(400).json(err);
    }
}); 
// route for user login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({where: { email: req.body.email } }); 

        if (!userData) {
            res 
                .status(400) 
                .json({ message: 'Incorrect email or password enetered, please try again!' });
            return;
        } 

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
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

module.exports = router;