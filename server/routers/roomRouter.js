const Router = require('express');
const router = Router();

const RoomController = require('../controllers/roomController');

router.post('/', RoomController.create);
router.get('/', RoomController.getAll);
router.get('/:id', RoomController.getOne);

router.put('/:id', RoomController.update);

module.exports = router;