const Router = require('express');
const router = Router();

const AccountController = require('../controllers/accountController');

router.post('/', AccountController.create);
router.get('/', AccountController.getAll);

module.exports = router;