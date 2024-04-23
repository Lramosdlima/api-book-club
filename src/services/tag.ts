import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { TagEntity } from '../entities/tag';
import { TagRepository } from '../repositories/tag';
import { HttpStatus } from '../types/http_status_type';

const response = new ResponseOn();
const tagRepository = new TagRepository();

export class TagService {
    getAll = async (page?: number, limit?: number): Promise<APIResponse<TagEntity[], ErrorTypes>> => {
        try {
            const tags = await tagRepository.getAll(page, limit);

            if (tags.length === 0 || !tags) {
                return response.unsuccessfully('Nenhuma tag encontrada', HttpStatus.NOT_FOUND);
            }

            return response.success(tags);

        } catch (error) {
            return response.error(error);
        }
    };

    getById = async (id: number): Promise<APIResponse<TagEntity | null, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const tag = await tagRepository.getById(id);

            if (!tag) {
                return response.unsuccessfully(`Tag de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            return response.success(tag);
        } catch (error) {
            return response.error(error);
        }
    };

    create = async (name: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!name ) {
                return response.unsuccessfully('O nome da tag é obrigatório');
            }

            await tagRepository.create({ name });

            return response.success('Tag foi criada com sucesso', HttpStatus.CREATED);
        } catch (error) {
            return response.error(error);
        }
    };

    update = async (id: number, name: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const checkTagExist = await tagRepository.getById(id);

            if (!checkTagExist) {
                return response.unsuccessfully(`Tag de id ${id} não encontrada`, HttpStatus.NOT_FOUND);
            }
        
            await tagRepository.update(id, { name });

            return response.success('Tag foi atualizada com sucesso');
        } catch (error) {
            return response.error(error);
        }
    };

    exclude = async (id: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const checkTagExist = await tagRepository.getById(id);

            if (!checkTagExist) {
                response.unsuccessfully(`Tag de id ${id} não encontrada`, HttpStatus.NOT_FOUND);
            }

            await tagRepository.exclude(id);

            return response.success('Tag foi excluída com sucesso');
        } catch (error) {
            return response.error(error);
        }
    };
}
