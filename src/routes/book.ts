import { Router } from 'express';

import { BookController } from '../controllers/book';
import { Middleware } from './middleware';

const router = Router();

const bookController = new BookController();
const middleware = new Middleware();

router.get('/all/complete', bookController.getAllWithCompleteInfo); // Todas as informações completas dos livros
router.get('/:id', bookController.getById); // Busca livro específico
router.get('/search', bookController.getByTitle); // Busca livro pelo seu título

router.post('/create/complete', middleware.auth, bookController.createWithCompleteInfo); // Cria livro e adiciona um novo autor
router.post('/create/with/author', middleware.auth, bookController.createWithAuthorAlreadyExists); // Cria livro com autor já existente

router.put('/update/:id', middleware.auth, bookController.update); // Atualiza dados de um livro

router.delete('/delete/:id', middleware.auth, bookController.exclude); // Deleta um livro

export default router;