const Router = require('express');
const router = Router();

const accountRouter = require('./accountRouter');
const dormitoryRouter = require('./dormitoryRouter');
const roomRouter = require('./roomRouter');
const studentRouter = require('./studentRouter');
const visitorRouter = require('./visitorRouter');
const workerRouter = require('./workerRouter');



router.use('/account', accountRouter);
router.use('/dormitory', dormitoryRouter);
router.use('/room', roomRouter);
router.use('/student', studentRouter);
router.use('/visitor', visitorRouter);
router.use('/worker', workerRouter);


module.exports = router;