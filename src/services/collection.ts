import NodeCache from 'node-cache';

import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { CollectionEntity } from '../entities/collection';
import { CollectionRepository } from '../repositories/collection';
import { HttpStatus } from '../types/http_status_type';
import { CollectionResponse } from '../types/interface';
import { BookRepository } from '../repositories/book';
import { UserRepository } from '../repositories/user';

const response = new ResponseOn();
const collectionRepository = new CollectionRepository();
const bookRepository = new BookRepository();
const userRepository = new UserRepository();

const CACHE_LIMIT = Number(process.env.CACHE_LIMIT) || 3600; 
const dbCache = new NodeCache({ stdTTL: CACHE_LIMIT, checkperiod: 0.2 });

export class CollectionService {
    getAll = async (page?: number, limit?: number): Promise<APIResponse<any, ErrorTypes>> => {
        try {
            const allCollectionsCached = `@api-book-club-cache::allCollections${page};${limit}`;

            if (dbCache.has(allCollectionsCached)) {
                const cachedResponse = dbCache.get(allCollectionsCached);
                return response.success(cachedResponse);
            }

            const collectionsWithBooks = await collectionRepository.getAll(page, limit);

            if (collectionsWithBooks.length === 0 || !collectionsWithBooks) {
                return response.unsuccessfully('Nenhuma coleção encontrado', HttpStatus.NOT_FOUND);
            }
            
            const collections = collectionsWithBooks.map(collectionBook => {
                return {
                    ...collectionBook.collection,
                    owner: collectionBook.collection.owner.name,
                    books: []
                };
            }).filter((collection, index, self) => {
                return index === self.findIndex(c => c.id === collection.id);
            });

            collectionsWithBooks.forEach(collWithBooks => {
                collections.find(coll => coll.id === collWithBooks.collection.id).books.push(collWithBooks.book);
            });

            dbCache.set(allCollectionsCached, collections, CACHE_LIMIT);

            return response.success(collections);

        } catch (error) {
            return response.error(error);
        }
    };

    getById = async (id: number): Promise<APIResponse<CollectionEntity | null, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const collection = await collectionRepository.getById(id);

            if (!collection) {
                return response.unsuccessfully(`Coleção de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            return response.success(collection);
        } catch (error) {
            return response.error(error);
        }
    };

    getAllByOwnerId = async (owner_id: number): Promise<APIResponse<CollectionResponse | null, ErrorTypes>> => {
        try {
            if (!owner_id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const collectionsWithBooks = await collectionRepository.getAllByOwnerId(owner_id);

            if (!collectionsWithBooks) {
                return response.unsuccessfully(`Coleção do usuário de id ${owner_id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            const collections: CollectionResponse = collectionsWithBooks.map(collectionBook => {
                return {
                    ...collectionBook.collection,
                    owner: collectionBook.collection.owner.name,
                    books: []
                };
            }).filter((collection, index, self) => {
                return index === self.findIndex(c => c.id === collection.id);
            });

            collectionsWithBooks.forEach(collWithBooks => {
                collections.find(coll => coll.id === collWithBooks.collection.id).books.push(collWithBooks.book);
            });

            return response.success(collections);
        } catch (error) {
            return response.error(error);
        }
    };

    getAllAddedByUserId = async (user_id: number): Promise<APIResponse<CollectionResponse | null, ErrorTypes>> => {
        try {
            if (!user_id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const userCollectionsAdded = await collectionRepository.getAllAddedByUserId(user_id);

            if (!userCollectionsAdded) {
                return response.unsuccessfully(`Coleção do usuário de id ${user_id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            const collections = await Promise.all(userCollectionsAdded.map( async collectionAdded => {
                const collectionBooks = await collectionRepository.getCollectionBookById(collectionAdded.collection_id);

                return {
                    ...collectionAdded.collection,
                    owner: collectionAdded.collection.owner.name,
                    books: collectionBooks ? collectionBooks.map(book => book.book) : []
                };
            }));

            return response.success(collections);

        } catch (error) {
            return response.error(error);
        }
    };

    create = async (title: string, description: string, owner_id: number, booksId?: number[]): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!title || !description || !owner_id ) {
                return response.unsuccessfully('O título, a descrição e o id são obrigatório');
            }

            const checkCollectionExist = await collectionRepository.getByTitle(title);

            if (checkCollectionExist) {
                return response.unsuccessfully('Ja existe uma coleção com esse título');
            }

            const collection = await collectionRepository.create({ title, description, owner_id });

            if (!collection) {
                return response.unsuccessfully('Erro ao criar a coleção');
            }

            const getId = await collectionRepository.getByTitle(title);

            if (booksId) {
                booksId.forEach(async (bookId) => {
                    await collectionRepository.addBookToCollection(getId.id, bookId);
                });

                return response.success('Coleção com livros criada com sucesso', HttpStatus.CREATED);
            }

            return response.success('Coleção foi criada com sucesso', HttpStatus.CREATED);
        } catch (error) {
            return response.error(error);
        }
    };

    addCollectionToUser = async (userId: number, collectionId: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!collectionId) {
                return response.unsuccessfully('O id da coleção é obrigatório');
            }
            
            if (!userId) {
                return response.unsuccessfully('O id do usuário é obrigatório');
            }

            const checkUserExist = await userRepository.getById(userId);

            if (!checkUserExist) {
                return response.unsuccessfully(`Usuário de id ${userId} não encontrado`, HttpStatus.NOT_FOUND);
            }

            const checkCollectionExist = await collectionRepository.getById(collectionId);

            if (!checkCollectionExist) {
                return response.unsuccessfully(`Coleção de id ${collectionId} não encontrada`, HttpStatus.NOT_FOUND);
            }

            const checkCollectionAdded = await collectionRepository.getCollecionAddedByUserId(collectionId, userId);

            if (checkCollectionAdded) {
                return response.unsuccessfully('Essa coleção já foi adicionada');
            }   

            await collectionRepository.addCollectionToUser(collectionId, userId);

            return response.success('Coleção foi adicionada ao usuário com sucesso', HttpStatus.CREATED);
        } catch (error) {
            return response.error(error);
        }
    };

    update = async (id: number, title: string, description: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id da coleção é obrigatório');
            }

            const checkCollectionExist = await collectionRepository.getById(id);

            if (!checkCollectionExist) {
                return response.unsuccessfully(`Coleção de id ${id} não encontrada`, HttpStatus.NOT_FOUND);
            }
        
            await collectionRepository.update(id, { title, description });

            return response.success('Coleção foi atualizada com sucesso');
        } catch (error) {
            return response.error(error);
        }
    };

    addBookToCollection = async (id: number, bookId: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id da coleção é obrigatório');
            }

            if (!bookId) {
                return response.unsuccessfully('O id do livro é obrigatório');
            }

            const checkCollectionExist = await collectionRepository.getById(id);

            if (!checkCollectionExist) {
                return response.unsuccessfully(`Coleção de id ${id} não encontrada`, HttpStatus.NOT_FOUND);
            }

            const checkBookExist = await bookRepository.getById(bookId);

            if (!checkBookExist) {
                return response.unsuccessfully(`Livro de id ${bookId} não encontrado`, HttpStatus.NOT_FOUND);
            }

            await collectionRepository.addBookToCollection(id, bookId);

            return response.success('Foi adicionado um livro a coleção com sucesso');

        } catch (error) {
            return response.error(error);
        }
    };

    exclude = async (id: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id da coleção é obrigatório');
            }

            const checkCollectionExist = await collectionRepository.getById(id);

            if (!checkCollectionExist) {
                return response.unsuccessfully(`Coleção de id ${id} não encontrada`, HttpStatus.NOT_FOUND);
            }

            await collectionRepository.exclude(id);

            return response.success('Coleção foi excluída com sucesso');
        } catch (error) {
            return response.error(error);
        }
    };

    removeCollectionFromUser = async (collectionId: number, userId: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!collectionId) {
                return response.unsuccessfully('O id da coleção é obrigatório');
            }
            
            if (!userId) {
                return response.unsuccessfully('O id do usuário é obrigatório');
            }

            const checkCollectionAddedExist = await collectionRepository.getCollecionAddedByUserId(collectionId, userId);

            if (!checkCollectionAddedExist) {
                return response.unsuccessfully('Essa coleção não foi adicionada ou já foi removida', HttpStatus.NOT_FOUND);
            }

            await collectionRepository.removeCollectionFromUser(collectionId, userId);

            return response.success('Coleção foi removida do usuário com sucesso');
        } catch (error) {
            return response.error(error);
        }
    };
}
