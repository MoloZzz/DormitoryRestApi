const Router = require('express');
const router = Router();

const userRouter = require('./accountRouter');
const typeRouter = require('./dormitoryRouter');
const autorRouter = require('./roomRouter');
const historyRouter = require('./studentRouter');
const historyRouter = require('./visitorRouter');
const historyRouter = require('./workerRouter');



router.use('/account',userRouter);
router.use('/dormitory',typeRouter);
router.use('/room',autorRouter);
router.use('/student',historyRouter);
router.use('/visitor',historyRouter);
router.use('/worker',historyRouter);


module.exports = router;