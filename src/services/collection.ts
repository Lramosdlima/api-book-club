import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { CollectionEntity } from '../entities/collection';
import { CollectionRepository } from '../repositories/collection';
import { HttpStatus } from '../types/http_status_type';

const response = new ResponseOn();
const collectionRepository = new CollectionRepository();

export class CollectionService {
    getAll = async (page?: number, limit?: number): Promise<APIResponse<CollectionEntity[], ErrorTypes>> => {
        try {
            const collections = await collectionRepository.getAll(page, limit);

            if (collections.length === 0 || !collections) {
                return response.unsuccessfully('Nenhuma coleção encontrado', HttpStatus.NOT_FOUND);
            }

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

    getAllByOwnerId = async (owner_id: number): Promise<APIResponse<CollectionEntity[] | null, ErrorTypes>> => {
        try {
            if (!owner_id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const collection = await collectionRepository.getAllByOwnerId(owner_id);

            if (!collection) {
                return response.unsuccessfully(`Coleção do usuário de id ${owner_id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            return response.success(collection);
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
