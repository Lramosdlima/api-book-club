import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { UserBookRateEntity } from '../entities/user_book_rate';
import { UserBookRateRepository } from '../repositories/user_book_rate';
import { HttpStatus } from '../types/http_status_type';

const response = new ResponseOn();
const UserBookRateRepository = new UserBookRateRepository();

export class UserBookRateService {
    getAll = async (page?: number, limit?: number): Promise<APIResponse<UserBookRateEntity[], ErrorTypes>> => {
        try {
            const tags = await UserBookRateRepository.getAll(page, limit);

            if (tags.length === 0 || !tags) {
                return response.unsuccessfully('Nenhuma rate encontrado', HttpStatus.NOT_FOUND);
            }

            return response.success(tags);

        } catch (error) {
            return response.error(error);
        }
    };

    getById = async (id: number): Promise<APIResponse<UserBookRateEntity | null, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const rate = await UserBookRateRepository.getById(id);

            if (!rate) {
                return response.unsuccessfully(`Rate de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            return response.success(rate);
        } catch (error) {
            return response.error(error);
        }
    };

    create = async (rate: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!rate ) {
                return response.unsuccessfully('A avaliação é obrigatória');
            }

            await UserBookRateRepository.create({ rate });

            return response.success('Avaliação foi criada com sucesso', HttpStatus.CREATED);
        } catch (error) {
            return response.error(error);
        }
    };

    update = async (id: number, rate: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const checkRateExist = await UserBookRateRepository.getById(id);

            if (!checkRateExist) {
                return response.unsuccessfully(`Rate de id ${id} não encontrada`, HttpStatus.NOT_FOUND);
            }
        
            await UserBookRateRepository.update(id, { name });

            return response.success('Rate foi atualizada com sucesso');
        } catch (error) {
            return response.error(error);
        }
    };

    exclude = async (id: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const checkTagExist = await UserBookRateRepository.getById(id);

            if (!checkTagExist) {
                response.unsuccessfully(`Rate de id ${id} não encontrada`, HttpStatus.NOT_FOUND);
            }

            await UserBookRateRepository.exclude(id);

            return response.success('Avaliação foi excluída com sucesso');
        } catch (error) {
            return response.error(error);
        }
    };
}
