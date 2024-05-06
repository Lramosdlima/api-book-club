import { Router } from 'express';

import { CollectionController } from '../controllers/collection';
import { Middleware } from './middleware';

const router = Router();

const collectionController = new CollectionController();
const middleware = new Middleware();

router.get('/all', collectionController.getAll); // Todas coleções da comunidade
router.get('/:id', collectionController.getById); // Uma coleção específica
router.get('/user/:owner_id', middleware.auth, collectionController.getAllByOwnerId); // Coleções que o usuário criou
router.get('/added/:user_id', middleware.auth, collectionController.getAllAddedByUserId); // Coleções que o usuário adicionou

router.post('/create', middleware.auth, collectionController.create); // Cria uma nova coleção
router.post('/user/add', middleware.auth, collectionController.addCollectionToUser); // Adiciona uma coleção a um usuário

router.patch('/update/:id', middleware.auth, collectionController.update); // Atualiza nome ou descrição de uma coleção
router.put('/add/book/:id', middleware.auth, collectionController.addBookToCollection); // Adiciona um ou mais livros a uma coleção

router.delete('/delete/:id', middleware.auth, collectionController.exclude); // Deleta uma coleção
router.delete('/user/remove/:id', middleware.auth, collectionController.removeCollectionFromUser); // Remove uma coleção de um usuário

export default router;