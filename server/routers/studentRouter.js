const Router = require('express');
const router = Router();

const StudentController = require('../controllers/studentController');

router.post('/', StudentController.create);
router.get('/', StudentController.getAll);


module.exports = router;