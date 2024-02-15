const Router = require('express');
const router = Router();

const AccountController = require('../controllers/accountController');

router.post('/', AccountController.create);
router.get('/', AccountController.getAll);
router.get('/:id', AccountController.getOne);

router.put('/:id', AccountController.update);

module.exports = router;