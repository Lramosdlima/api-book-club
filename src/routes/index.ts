import { Router } from 'express';

import AuthRouter from './auth';
import AuthorRouter from './author';
import BookRouter from './book';
import CollectionRouter from './collection';
import TagRouter from './tag';
import GenreRouter from './genre';
import { Middleware } from './middleware';
import UserRouter from './user';

const router = Router();

const middleware = new Middleware();

router.use('/auth', AuthRouter);
router.use('/user', middleware.auth, UserRouter);
router.use('/book', middleware.auth, BookRouter);
router.use('/author', middleware.auth, AuthorRouter);
router.use('/genre', middleware.auth, GenreRouter);
router.use('/collecion', middleware.auth, CollectionRouter);
router.use('/tag', middleware.auth, TagRouter);

export default router;