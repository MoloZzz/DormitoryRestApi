const Router = require('express');
const router = Router();

const VisitorController = require('../controllers/visitorController');

router.post('/', VisitorController.create);
router.get('/', VisitorController.getAll);
router.get('/:id', VisitorController.getOne);

router.get('/get-all-by-student-id/:studentId', VisitorController.getAllByStudentId)

module.exports = router;