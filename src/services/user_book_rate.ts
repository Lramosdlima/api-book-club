import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { UserBookRateEntity } from '../entities/user_book_rate';
import { UserBookRateRepository } from '../repositories/user_book_rate';
import { CreateUserBookRateDTO, UpdateUserBookRateDTO } from '../types/dto';
import { HttpStatus } from '../types/http_status_type';

const response = new ResponseOn();
const userBookRateRepository = new UserBookRateRepository();

export class UserBookRateService {
    getAll = async (page?: number, limit?: number): Promise<APIResponse<UserBookRateEntity[], ErrorTypes>> => {
        try {
            const tags = await userBookRateRepository.getAll(page, limit);

            if (tags.length === 0 || !tags) {
                return response.unsuccessfully('Nenhuma avaliação encontrada', HttpStatus.NOT_FOUND);
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

            const rate = await userBookRateRepository.getById(id);

            if (!rate) {
                return response.unsuccessfully(`Avaliação de id ${id} não encontrada`, HttpStatus.NOT_FOUND);
            }

            return response.success(rate);
        } catch (error) {
            return response.error(error);
        }
    };

    getAllByBookId = async (book_id: number): Promise<APIResponse<UserBookRateEntity[] | null, ErrorTypes>> => {
        try {
            if (!book_id) {
                return response.unsuccessfully('O id do Livro é obrigatório');
            }

            const rate = await userBookRateRepository.getAllByBookId(book_id);

            if (!rate) {
                return response.unsuccessfully(`Avaliação do Livro de id ${book_id} não encontrada`, HttpStatus.NOT_FOUND);
            }

            return response.success(rate);

        } catch (error) {
            return response.error(error);
        }
    };

    getAllByUserId = async (user_id: number): Promise<APIResponse<UserBookRateEntity[] | null, ErrorTypes>> => {
        try {
            if (!user_id) {
                return response.unsuccessfully('O id do usuário é obrigatório');
            }

            const rate = await userBookRateRepository.getAllByUserId(user_id);

            if (!rate) {
                return response.unsuccessfully(`Avaliação do Livro de id ${user_id} não encontrada`, HttpStatus.NOT_FOUND);
            }

            return response.success(rate);

        } catch (error) {
            return response.error(error);
        }
    };

    create = async (createUserBookRateDTO: CreateUserBookRateDTO): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            const { user_id, book_id } = createUserBookRateDTO;

            if (!user_id || !book_id) {
                return response.unsuccessfully('O id do usuário e do Livro são obrigatórios');
            }

            await userBookRateRepository.create(createUserBookRateDTO);

            return response.success('Avaliação foi criada com sucesso', HttpStatus.CREATED);
        } catch (error) {
            return response.error(error);
        }
    };

    update = async (id: number, updateUserBookRateDTO: UpdateUserBookRateDTO): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const checkRateExist = await userBookRateRepository.getById(id);

            if (!checkRateExist) {
                return response.unsuccessfully(`Rate de id ${id} não encontrada`, HttpStatus.NOT_FOUND);
            }
        
            await userBookRateRepository.update(id, updateUserBookRateDTO);

            return response.success('Avaliação foi atualizada com sucesso');
        } catch (error) {
            return response.error(error);
        }
    };

    exclude = async (id: number): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const checkTagExist = await userBookRateRepository.getById(id);

            if (!checkTagExist) {
                response.unsuccessfully(`Avaliação de id ${id} não encontrada`, HttpStatus.NOT_FOUND);
            }

            await userBookRateRepository.exclude(id);

            return response.success('Avaliação foi excluída com sucesso');
        } catch (error) {
            return response.error(error);
        }
    };
}
