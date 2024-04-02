import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { CollectionEntity } from '../entities/collection';
import { CollectionRepository } from '../repositories/collection';
import { HttpStatus } from '../types/http_status_type';

const response = new ResponseOn();
const collectionRepository = new CollectionRepository();

export class CollectionService {
    getAll = async (): Promise<APIResponse<CollectionEntity[], ErrorTypes>> => {
        try {
            const collections = await collectionRepository.getAll();

            if (collections.length === 0 || !collections) {
                return response.error('Nenhuma coleção encontrado', HttpStatus.NOT_FOUND);
            }

            return response.success(collections, HttpStatus.OK);

        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    getById = async (id: number): Promise<APIResponse<CollectionEntity | null, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', HttpStatus.BAD_REQUEST);
            }

            const collection = await collectionRepository.getById(id);

            if (!collection) {
                return response.error(`Coleção de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            return response.success(collection, HttpStatus.OK);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    getAllByOwnerId = async (owner_id: number): Promise<APIResponse<CollectionEntity[] | null, ErrorTypes>> => {
        try {
            if (!owner_id) {
                return response.error('O id é obrigatório', HttpStatus.BAD_REQUEST);
            }

            const collection = await collectionRepository.getAllByOwnerId(owner_id);

            if (!collection) {
                return response.error(`Coleção do usuário de id ${owner_id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            return response.success(collection, HttpStatus.OK);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    create = async (title: string, description: string, owner_id: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!title || !description || !owner_id ) {
                return response.error('O título, a descrição e o id são obrigatório', HttpStatus.BAD_REQUEST);
            }

            await collectionRepository.create({ title, description, owner_id });

            return response.success('Coleção foi criada com sucesso', HttpStatus.CREATED);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    addCollectionToUser = async (user_id: number, collection_id: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!user_id || !collection_id) {
                return response.error('O id do usuário e da coleção são obrigatórios', HttpStatus.BAD_REQUEST);
            }

            await collectionRepository.addCollectionToUser(user_id, collection_id);

            return response.success('Coleção foi adicionada ao usuário com sucesso', HttpStatus.CREATED);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    update = async (id: number, title: string, description: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', HttpStatus.BAD_REQUEST);
            }

            const checkCollectionExist = await collectionRepository.getById(id);

            if (!checkCollectionExist) {
                return response.error(`Coleção de id ${id} não encontrada`, HttpStatus.NOT_FOUND);
            }
        
            await collectionRepository.update(id, { title, description });

            return response.success('Coleção foi atualizada com sucesso', HttpStatus.OK);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    exclude = async (id: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', HttpStatus.BAD_REQUEST);
            }

            const checkCollectionExist = await collectionRepository.getById(id);

            if (!checkCollectionExist) {
                response.error(`Coleção de id ${id} não encontrada`, HttpStatus.NOT_FOUND);
            }

            await collectionRepository.exclude(id);

            return response.success('Coleção foi excluída com sucesso', HttpStatus.OK);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    removeCollectionFromUser = async (id: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', HttpStatus.BAD_REQUEST);
            }

            const checkCollectionExist = await collectionRepository.getById(id);

            if (!checkCollectionExist) {
                return response.error(`Coleção de id ${id} não encontrada`, HttpStatus.NOT_FOUND);
            }

            await collectionRepository.removeCollectionFromUser(id);

            return response.success('Coleção foi removida do usuário com sucesso', HttpStatus.OK);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
}
