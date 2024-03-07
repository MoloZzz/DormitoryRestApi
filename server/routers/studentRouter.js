const Router = require('express');
const router = Router();

const StudentController = require('../controllers/studentController');

router.post('/', StudentController.create);
router.get('/', StudentController.getAll);
router.get('/:id', StudentController.getOne);
router.delete('/:id',StudentController.delete);
router.put('/',StudentController.change);

module.exports = router;