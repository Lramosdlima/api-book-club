const { Router } = require('express');
const BookRouter = require('./book');
const AuthorRouter = require('./author');
const CommunityRouter = require('./community');
const UserRouter = require('./user');

const router = Router();

router.use('/book', BookRouter);
router.use('/author', AuthorRouter);
router.use('/community', CommunityRouter);
router.use('/user', UserRouter);



module.exports = router;