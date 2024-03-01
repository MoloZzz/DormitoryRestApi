const Router = require('express');
const router = Router();

const AccountController = require('../controllers/accountController');

router.post('/', AccountController.create);
router.get('/', AccountController.getAll);
router.get('/:id', AccountController.getOne);

router.post('/importExcel',AccountController.importToExcel);

router.put('/:id', AccountController.update);

module.exports = router;