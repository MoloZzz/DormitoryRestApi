const Router = require('express');
const router = Router();

const RoomController = require('../controllers/roomController');

router.post('/', RoomController.create);
router.get('/', RoomController.getAll);

module.exports = router;