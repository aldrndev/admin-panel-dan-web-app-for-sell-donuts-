const express = require('express');
const router = express.Router();
const adminRouter = require('./adminRouters');
const userRouter = require('./userRouters');

router.use('/user', userRouter);
router.use('/admin', adminRouter);
module.exports = router;
