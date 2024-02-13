const Router = require('express');
const router = Router();

const WorkerController = require('../controllers/workerController');

router.post('/', WorkerController.create);
router.get('/', WorkerController.getAll);
router.get('/:id', WorkerController.getOne);


module.exports = router;