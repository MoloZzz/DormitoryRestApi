const Router = require('express');
const router = Router();

const VisitorController = require('../controllers/visitorController');

router.post('/', VisitorController.create);
router.get('/', VisitorController.getAll);
router.get('/:id', VisitorController.getOne);

module.exports = router;