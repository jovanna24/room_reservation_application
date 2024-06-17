const router = require('express').Router(); 
const { Room } = require('../../models'); 
const withAuth = require('../../utils/auth'); 

// route to retrieve rooms 
router.get('/', withAuth, async (req, res) => {
    try {
      const room = await Room.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });
      const rooms = roomData.map((room) => room.get({ plain: true }));
      res.render('rooms', {
        rooms, 
        logged_in: req.session.logged_in,
      });
    } catch (err) { 
      console.error('Error fetching rooms:',err);
      res.status(500).json({ message: 'Error fetching rooms', error: err });
    }
  });
// route to create a new room
router.post('/', withAuth, async (req, res) => {
    try {
        const newroom = await Room.create({
            ...req.body,
            user_id: req.session.user_id
        }); 
        res.status(200).json(newRoom);
    } catch (err) { 
        console.error('Error creating room:', err);
        res.status(400).json({ message: 'Error creating room', error: err });
    }
}); 

// route to delet a room by id
router.delete('/:id', withAuth, async (req, res) => {
    try{
        const roomData = await Room.destroy({
            where: {
                id: req.params.id, 
                user_id: req.session.user_id,
            }, 
        });
        if (!roomData) {
            res.status(404).json({ message: 'No room found with this id!' });
            return;
        }
        res.status(200).json({ message: 'room deleted successfully!' });
    } catch(err) {
      console.error('Error deleting room:', err);
      res.status(500).json({ message: 'Error deleting room', error: err });
    }
});

module.exports = router;