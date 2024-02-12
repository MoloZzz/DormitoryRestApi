const Router = require('express');
const router = Router();

const VisitorController = require('../controllers/visitorController');

router.post('/', VisitorController.create);
router.get('/', VisitorController.getAll);

module.exports = router;