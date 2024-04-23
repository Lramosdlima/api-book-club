import { Router } from 'express';

import { BookController } from '../controllers/book';
import { Middleware } from './middleware';

const router = Router();

const bookController = new BookController();
const middleware = new Middleware();

router.get('/all', bookController.getAllWithCompleteInfo); // Todas as informações completas dos livros
router.get('/:id', bookController.getById); // Busca livro específico
router.get('/search/with/title', bookController.getByTitle); // Busca livro pelo seu título
router.get('/search/with/genre', bookController.getByGenreId); // Busca livro pelo seu genero
router.get('/search/with/author', bookController.getByAuthorId); // Busca livro pelo seu autor
router.get('/all/most/liked', bookController.getMostLiked); // Busca livro com mais likes

router.post('/create/complete', middleware.auth, bookController.createWithCompleteInfo); // Cria livro e adiciona um novo autor
router.post('/create/with/author', middleware.auth, bookController.createWithAuthorAlreadyExists); // Cria livro com autor já existente

router.put('/update/:id', middleware.auth, bookController.update); // Atualiza dados de um livro

router.delete('/delete/:id', middleware.auth, bookController.exclude); // Deleta um livro

export default router;