const Router = require('express');
const router = Router();

const StudentController = require('../controllers/studentController');

router.post('/', StudentController.create);
router.get('/', StudentController.getAll);
router.get('/:id', StudentController.getOne);
router.get('/info/:id', StudentController.getStudentInfo);
router.post('/get-all-by-dormitory-num/:dormitory_num', StudentController.getStudentsWithRoomNameByDormNum)
router.delete('/:id',StudentController.delete);
router.put('/',StudentController.change);

module.exports = router;