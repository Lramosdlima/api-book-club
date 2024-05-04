import NodeCache from 'node-cache';

import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { CollectionEntity } from '../entities/collection';
import { CollectionRepository } from '../repositories/collection';
import { HttpStatus } from '../types/http_status_type';

const response = new ResponseOn();
const collectionRepository = new CollectionRepository();

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
            
            const collections = collectionsWithBooks.map(collection => {
                return {
                    ...collection.collection,
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

    getAllByOwnerId = async (owner_id: number): Promise<APIResponse<any | null, ErrorTypes>> => {
        try {
            if (!owner_id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const collectionsWithBooks = await collectionRepository.getAllByOwnerId(owner_id);

            if (!collectionsWithBooks) {
                return response.unsuccessfully(`Coleção do usuário de id ${owner_id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            const collections = collectionsWithBooks.map(collection => {
                return {
                    ...collection.collection,
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

    create = async (title: string, description: string, owner_id: number, booksId?: number[]): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!title || !description || !owner_id ) {
                return response.unsuccessfully('O título, a descrição e o id são obrigatório');
            }

            const collection = await collectionRepository.create({ title, description, owner_id });

            if (!collection) {
                return response.unsuccessfully('Erro ao criar a coleção');
            }

            if (booksId) {
                booksId.forEach(async (bookId) => {
                    await collectionRepository.addBookToCollection(collection.id, bookId);
                });

                return response.success('Coleção com livros criada com sucesso', HttpStatus.CREATED);
            }

            return response.success('Coleção foi criada com sucesso', HttpStatus.CREATED);
        } catch (error) {
            return response.error(error);
        }
    };

    addCollectionToUser = async (user_id: number, collection_id: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!user_id || !collection_id) {
                return response.unsuccessfully('O id do usuário e da coleção são obrigatórios');
            }

            await collectionRepository.addCollectionToUser(user_id, collection_id);

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

    removeCollectionFromUser = async (id: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const checkCollectionExist = await collectionRepository.getById(id);

            if (!checkCollectionExist) {
                return response.unsuccessfully(`Coleção de id ${id} não encontrada`, HttpStatus.NOT_FOUND);
            }

            await collectionRepository.removeCollectionFromUser(id);

            return response.success('Coleção foi removida do usuário com sucesso');
        } catch (error) {
            return response.error(error);
        }
    };
}
