const Router = require('express');
const router = Router();

const DormitoryController = require('../controllers/dormitoryController');

router.post('/', DormitoryController.create);
router.get('/', DormitoryController.getAll);
router.get('/:id', DormitoryController.getOne);

module.exports = router;