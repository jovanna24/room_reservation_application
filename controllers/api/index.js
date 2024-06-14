const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./event-route');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);

module.exports = router;