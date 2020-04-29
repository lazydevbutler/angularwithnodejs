var Router = require('express');

const router = Router();

router.use('/user',require('./user'));
router.use('/report',require('./report'));


module.exports = router;