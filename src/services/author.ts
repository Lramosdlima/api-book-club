import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { AuthorEntity } from '../entities/author';
import { AuthorRepository } from '../repositories/author';
import { HttpStatus } from '../types/http_status_type';

const response = new ResponseOn();
const authorRepository = new AuthorRepository();

export class AuthorService {
    getAll = async (page?: number, limit?: number): Promise<APIResponse<AuthorEntity[] | string, ErrorTypes>> => {
        try {
            const authors = await authorRepository.getAll(page, limit);

            if (authors.length === 0 || !authors) {
                return response.unsuccessfully('Nenhum autor encontrado', HttpStatus.NOT_FOUND);
            }

            return response.success(authors);

        } catch (error) {
            return response.error(error);
        }
    };

    getById = async (id: number): Promise<APIResponse<AuthorEntity | string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const author = await authorRepository.getById(id);

            if (!author) {
                return response.unsuccessfully(`Autor de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            return response.success(author);
        } catch (error) {
            return response.error(error);
        }
    };

    create = async (name: string, description: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!name || !description) {
                return response.unsuccessfully('O nome e a descrição são obrigatórios');
            }

            const checkAuthorExist = await authorRepository.getByName(name);

            if (!checkAuthorExist) {
                return response.unsuccessfully('O autor já existe');
            }

            await authorRepository.create({ name, description });

            return response.success('Autor foi criado com sucesso', HttpStatus.CREATED);
        } catch (error) {
            return response.error(error);
        }
    };

    update = async (id: number, name: string, description: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id || !name || !description) {
                return response.unsuccessfully('O id, o nome e a descrição são obrigatórios');
            }

            const checkAuthorExist = await authorRepository.getById(id);

            if (!checkAuthorExist) {
                return response.unsuccessfully(`Autor de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }
        
            await authorRepository.update(id, { name, description });

            return response.success('Autor foi atualizado com sucesso');
        } catch (error) {
            return response.error(error);
        }
    };

    exclude = async (id: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const checkAuthorExist = await authorRepository.getById(id);

            if (!checkAuthorExist) {
                response.unsuccessfully(`Autor de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            await authorRepository.exclude(id);

            return response.success('Autor foi excluído com sucesso');
        } catch (error) {
            return response.error(error);
        }
    };
}