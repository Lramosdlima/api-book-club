import { Router } from 'express';

import AuthRouter from './auth';
import AuthorRouter from './author';
import BookRouter from './book';
import InteractionRouter from './interaction';
import CollectionRouter from './collection';
import GenreRouter from './genre';
import { Middleware } from './middleware';
import TagRouter from './tag';
import UserRouter from './user';

const router = Router();

const middleware = new Middleware();

router.use('/auth', AuthRouter);
router.use('/book', middleware.auth, BookRouter);
router.use('/interaction', middleware.auth, InteractionRouter);
router.use('/author', middleware.auth, AuthorRouter);
router.use('/genre', middleware.auth, GenreRouter);
router.use('/collecion', middleware.auth, CollectionRouter);
router.use('/tag', middleware.auth, TagRouter);
router.use('/user', middleware.auth, UserRouter);

export default router;