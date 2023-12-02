const { Router } = require('express');
const BookRouter = require('./book');
const AuthorRouter = require('./author');
const CommunityRouter = require('./community');
const CommunityChatRouter = require('./communityChat');
const FavoriteBookRouter = require('./favoriteBook');
const UserRouter = require('./user');
const GenreRouter = require('./genre');
const AuthRouter = require('./auth');
const { Middleware } = require('./middleware');

const router = Router();

const middleware = new Middleware();

router.use('/auth', AuthRouter);
router.use('/book', middleware.auth, BookRouter);
router.use('/favorite', middleware.auth, FavoriteBookRouter);
router.use('/author', middleware.auth, AuthorRouter);
router.use('/community', middleware.auth, CommunityRouter);
router.use('/communityChat', middleware.auth, CommunityChatRouter);
router.use('/user', middleware.auth, UserRouter);
router.use('/genre', middleware.auth, GenreRouter);

module.exports = router;