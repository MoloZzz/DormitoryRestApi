const Router = require('express');
const router = Router();
const { body } = require('express-validator');

const RoomController = require('../controllers/roomController');

router.post('/', RoomController.create);
router.get('/', RoomController.getAll);
router.get('/:id', RoomController.getOne);

router.post('/get-by-dorm-num-and-name/',
    body("dorm_number").isNumeric().withMessage("Номер гуртожитку має бути числом"),
    body("room_name").matches(/^\d{3,}\/\d$/).withMessage("Назва кімнати має бути у форматі NNN/N"), RoomController.getByDormNumAndName);    

router.put('/:id', RoomController.update);

module.exports = router;