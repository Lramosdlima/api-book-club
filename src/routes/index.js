const { Router } = require('express');
const BookRouter = require('./book');
const AuthorRouter = require('./author');

const router = Router();

router.use('/book', BookRouter);
router.use('/author', AuthorRouter);
router.use('/community', CommunityRouter);


module.exports = router;