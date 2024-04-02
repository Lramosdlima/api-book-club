import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { CollectionEntity } from '../entities/collection';
import { CollectionRepository } from '../repositories/collection';

const response = new ResponseOn();
const collectionRepository = new CollectionRepository();

export class CollectionService {
    getAll = async (): Promise<APIResponse<CollectionEntity[], ErrorTypes>> => {
        try {
            const collections = await collectionRepository.getAll();

            if (collections.length === 0 || !collections) {
                return response.error('Nenhuma coleção encontrado', 404);
            }

            return response.success(collections, 200);

        } catch (error) {
            return response.error(error, 500);
        }
    };

    getById = async (id: number): Promise<APIResponse<CollectionEntity | null, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', 400);
            }

            const collection = await collectionRepository.getById(id);

            if (!collection) {
                return response.error(`Coleção de id ${id} não encontrado`, 404);
            }

            return response.success(collection, 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    getAllByOwnerId = async (owner_id: number): Promise<APIResponse<CollectionEntity[] | null, ErrorTypes>> => {
        try {
            if (!owner_id) {
                return response.error('O id é obrigatório', 400);
            }

            const collection = await collectionRepository.getAllByOwnerId(owner_id);

            if (!collection) {
                return response.error(`Coleção do usuário de id ${owner_id} não encontrado`, 404);
            }

            return response.success(collection, 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    create = async (title: string, description: string, owner_id: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!title || !description || !owner_id ) {
                return response.error('O título, a descrição e o id são obrigatório', 400);
            }

            await collectionRepository.create({ title, description, owner_id });

            return response.success('Coleção foi criada com sucesso', 201);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    addCollectionToUser = async (user_id: number, collection_id: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!user_id || !collection_id) {
                return response.error('O id do usuário e da coleção são obrigatórios', 400);
            }

            await collectionRepository.addCollectionToUser(user_id, collection_id);

            return response.success('Coleção foi adicionada ao usuário com sucesso', 201);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    update = async (id: number, title: string, description: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', 400);
            }

            const checkCollectionExist = await collectionRepository.getById(id);

            if (!checkCollectionExist) {
                return response.error(`Coleção de id ${id} não encontrada`, 404);
            }
        
            await collectionRepository.update(id, { title, description });

            return response.success('Coleção foi atualizada com sucesso', 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    exclude = async (id: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', 400);
            }

            const checkCollectionExist = await collectionRepository.getById(id);

            if (!checkCollectionExist) {
                response.error(`Coleção de id ${id} não encontrada`, 404);
            }

            await collectionRepository.exclude(id);

            return response.success('Coleção foi excluída com sucesso', 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };
}
