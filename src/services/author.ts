import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { AuthorEntity } from '../entities/author';
import { AuthorRepository } from '../repositories/author';
import { HttpStatus } from '../types/http_status_type';

const response = new ResponseOn();
const authorRepository = new AuthorRepository();

export class AuthorService {
    getAll = async (): Promise<APIResponse<AuthorEntity[] | string, ErrorTypes>> => {
        try {
            const authors = await authorRepository.getAll();

            if (authors.length === 0 || !authors) {
                return response.error('Nenhum autor encontrado', HttpStatus.NOT_FOUND);
            }

            return response.success(authors, HttpStatus.OK);

        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    getById = async (id: number): Promise<APIResponse<AuthorEntity | string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', HttpStatus.BAD_REQUEST);
            }

            const author = await authorRepository.getById(id);

            if (!author) {
                return response.error(`Autor de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            return response.success(author, HttpStatus.OK);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    create = async (name: string, description: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!name || !description) {
                return response.error('O nome e a descrição são obrigatórios', HttpStatus.BAD_REQUEST);
            }

            const checkAuthorExist = await authorRepository.getByName(name);

            if (!checkAuthorExist) {
                return response.error('O autor já existe', HttpStatus.BAD_REQUEST);
            }

            await authorRepository.create({ name, description });

            return response.success('Autor foi criado com sucesso', HttpStatus.CREATED);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    update = async (id: number, name: string, description: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id || !name || !description) {
                return response.error('O id, o nome e a descrição são obrigatórios', HttpStatus.BAD_REQUEST);
            }

            const checkAuthorExist = await authorRepository.getById(id);

            if (!checkAuthorExist) {
                return response.error(`Autor de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }
        
            await authorRepository.update(id, { name, description });

            return response.success('Autor foi atualizado com sucesso', HttpStatus.OK);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    exclude = async (id: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', HttpStatus.BAD_REQUEST);
            }

            const checkAuthorExist = await authorRepository.getById(id);

            if (!checkAuthorExist) {
                response.error(`Autor de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            await authorRepository.exclude(id);

            return response.success('Autor foi excluído com sucesso', HttpStatus.OK);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
}