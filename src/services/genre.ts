import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { GenreEntity } from '../entities/genre';
import { GenreRepository } from '../repositories/genre';
import { HttpStatus } from '../types/http_status_type';

const response = new ResponseOn();
const genreRepository = new GenreRepository();

export class GenreService {
    getAll = async (): Promise<APIResponse<GenreEntity[], ErrorTypes>> => {
        try {
            const genres = await genreRepository.getAll();

            if (genres.length === 0 || !genres) {
                return response.error('Nenhum gênero encontrado', HttpStatus.NOT_FOUND);
            }

            return response.success(genres, HttpStatus.OK);

        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    getById = async (id: number): Promise<APIResponse<GenreEntity | null, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', HttpStatus.BAD_REQUEST);
            }

            const genre = await genreRepository.getById(id);

            if (!genre) {
                return response.error(`Gênero de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            return response.success(genre, HttpStatus.OK);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    create = async (name: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!name) {
                return response.error('O nome é obrigatório', HttpStatus.BAD_REQUEST);
            }

            const checkGenreExist = await genreRepository.getByName(name);

            if (!checkGenreExist) {
                return response.error('O gênero já existe', HttpStatus.BAD_REQUEST);
            }

            await genreRepository.create({ name });

            return response.success('Gênero foi criado com sucesso', HttpStatus.CREATED);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    update = async (id: number, name: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id || !name) {
                return response.error('O id e o nome são obrigatórios', HttpStatus.BAD_REQUEST);
            }

            const checkGenreExist = await genreRepository.getById(id);

            if (!checkGenreExist) {
                return response.error(`Gênero de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }
        
            await genreRepository.update(id, { name });

            return response.success('Gênero foi atualizado com sucesso', HttpStatus.OK);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    exclude = async (id: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', HttpStatus.BAD_REQUEST);
            }

            const checkGenreExist = await genreRepository.getById(id);

            if (!checkGenreExist) {
                response.error(`Gênero de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            await genreRepository.exclude(id);

            return response.success('Gênero foi excluído com sucesso', HttpStatus.OK);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
}
