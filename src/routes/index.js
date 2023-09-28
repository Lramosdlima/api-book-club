const { Router } = require('express');
const BookRouter = require('./book');

const router = Router();

router.use('/book', BookRouter);

module.exports = router;