const Router = require('express');
const router = Router();

const WorkerController = require('../controllers/workerController');

router.post('/', WorkerController.create);
router.get('/', WorkerController.getAll);


module.exports = router;