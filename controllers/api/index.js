const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes'); 
const roomRoutes = require('./roomRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes); 
router.use('/rooms', roomRoutes);

module.exports = router;