const Router = require('express');
const router = Router();

const DormitoryController = require('../controllers/dormitoryController');

router.post('/', DormitoryController.create);
router.get('/', DormitoryController.getAll);
router.get('/:id', DormitoryController.getOne);

router.put('/:id', DormitoryController.update);

module.exports = router;