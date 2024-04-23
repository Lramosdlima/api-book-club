import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { GenreEntity } from '../entities/genre';
import { GenreRepository } from '../repositories/genre';
import { HttpStatus } from '../types/http_status_type';

const response = new ResponseOn();
const genreRepository = new GenreRepository();

export class GenreService {
    getAll = async (page?: number, limit?: number): Promise<APIResponse<GenreEntity[], ErrorTypes>> => {
        try {
            const genres = await genreRepository.getAll(page, limit);

            if (genres.length === 0 || !genres) {
                return response.unsuccessfully('Nenhum gênero encontrado', HttpStatus.NOT_FOUND);
            }

            return response.success(genres);

        } catch (error) {
            return response.error(error);
        }
    };

    getById = async (id: number): Promise<APIResponse<GenreEntity | null, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const genre = await genreRepository.getById(id);

            if (!genre) {
                return response.unsuccessfully(`Gênero de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            return response.success(genre);
        } catch (error) {
            return response.error(error);
        }
    };

    create = async (name: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!name) {
                return response.unsuccessfully('O nome é obrigatório');
            }

            const checkGenreExist = await genreRepository.getByName(name);

            if (!checkGenreExist) {
                return response.unsuccessfully('O gênero já existe');
            }

            await genreRepository.create({ name });

            return response.success('Gênero foi criado com sucesso', HttpStatus.CREATED);
        } catch (error) {
            return response.error(error);
        }
    };

    update = async (id: number, name: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id || !name) {
                return response.unsuccessfully('O id e o nome são obrigatórios');
            }

            const checkGenreExist = await genreRepository.getById(id);

            if (!checkGenreExist) {
                return response.unsuccessfully(`Gênero de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }
        
            await genreRepository.update(id, { name });

            return response.success('Gênero foi atualizado com sucesso');
        } catch (error) {
            return response.error(error);
        }
    };

    exclude = async (id: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const checkGenreExist = await genreRepository.getById(id);

            if (!checkGenreExist) {
                return response.unsuccessfully(`Gênero de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            await genreRepository.exclude(id);

            return response.success('Gênero foi excluído com sucesso');
        } catch (error) {
            return response.error(error);
        }
    };
}
