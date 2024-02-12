const Router = require('express');
const router = Router();

const DormitoryController = require('../controllers/dormitoryController');

router.post('/', DormitoryController.create);
router.get('/', DormitoryController.getAll);


module.exports = router;