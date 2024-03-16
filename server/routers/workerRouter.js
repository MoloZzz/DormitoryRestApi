const Router = require('express');
const router = Router();

const WorkerController = require('../controllers/workerController');

router.post('/', WorkerController.create);
router.get('/', WorkerController.getAll);
router.get('/:id', WorkerController.getOne);

router.put('/',WorkerController.change);

router.get('/get-all-by-dorm-number/:dorm_number', WorkerController.getAllByDormNumber);

module.exports = router;