const { Router } = require('express');
const BookRouter = require('./book');
const AuthorRouter = require('./author');
const CommunityRouter = require('./community');
const CommunityChatRouter = require('./communityChat');
const UserRouter = require('./user');
const GenreRouter = require('./genre');


const router = Router();

router.use('/book', BookRouter);
router.use('/author', AuthorRouter);
router.use('/community', CommunityRouter);
router.use('/communityChat', CommunityChatRouter);
router.use('/user', UserRouter);
router.use('/genre', GenreRouter);



module.exports = router;