import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { BookUserEntity } from '../entities/book_user';
import { BookUserRepository } from '../repositories/book_user';
import { CreateBookUserDTO, UpdateBookUserDTO } from '../types/dto';
import { HttpStatus } from '../types/http_status_type';

const response = new ResponseOn();
const bookUserRepository = new BookUserRepository();

export class BookUserService {
    getAllInteractionsByBookId = async (book_id: number, page?: number, limit?: number): Promise<APIResponse<BookUserEntity[], ErrorTypes>> => {
        try {
            if (!book_id) {
                return response.unsuccessfully('O id do livro é obrigatório');
            }

            const bookUsers = await bookUserRepository.getAllByBookId(book_id, page, limit);

            if (bookUsers.length === 0 || !bookUsers) {
                return response.unsuccessfully('Nenhuma interação do livro do usuário foi encontrada', HttpStatus.NOT_FOUND);
            }

            return response.success(bookUsers);

        } catch (error) {
            return response.error(error);
        }
    };

    getAllInteractionsByUserId = async (user_id: number, page?: number, limit?: number): Promise<APIResponse<BookUserEntity[] | null, ErrorTypes>> => {
        try {
            if (!user_id) {
                return response.unsuccessfully('O id do usuário é obrigatório');
            }

            const bookUser = await bookUserRepository.getAllByUserId(user_id, page, limit);

            if (!bookUser) {
                return response.unsuccessfully(`Interação do livro desse usuário ${user_id} não foi encontrado`, HttpStatus.NOT_FOUND);
            }

            return response.success(bookUser);
        } catch (error) {
            return response.error(error);
        }
    };

    add = async (createBookUserDTO: CreateBookUserDTO): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            const { user_id, book_id, already_read, want_to_read, liked } = createBookUserDTO;

            if (!user_id || !book_id) {
                return response.unsuccessfully('O id do usuário e do livro são obrigatórios');
            }

            const checkBookUserExist = await bookUserRepository.getByUserIdAndBookId(user_id, book_id);

            if (checkBookUserExist) {
                await bookUserRepository.update(checkBookUserExist.id, { already_read, want_to_read, liked });
            } else {
                await bookUserRepository.create({ user_id, book_id, already_read, want_to_read, liked });
            }

            const typeInfo: string[] = [];

            if (already_read) typeInfo.push('já lido');
            if (want_to_read) typeInfo.push('quero ler');
            if (liked) typeInfo.push('gostei');

            const message = typeInfo.join(', ');

            return response.success(`Foi adicionado nova interação de ${message}`, HttpStatus.CREATED);
        } catch (error) {
            return response.error(error);
        }
    };

    update = async (id: number, updateBookUserDTO: UpdateBookUserDTO): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const { already_read, want_to_read, liked } = updateBookUserDTO;

            const checkBookUserExist = await bookUserRepository.getById(id);

            if (!checkBookUserExist) {
                return response.unsuccessfully(`Interação do livro ${id} do usuário não encontrada`, HttpStatus.NOT_FOUND);
            }
        
            await bookUserRepository.update(id, updateBookUserDTO);

            const typeInfo: string[] = [];

            if (already_read) typeInfo.push('já lido');
            if (want_to_read) typeInfo.push('quero ler');
            if (liked) typeInfo.push('gostei');

            const message = typeInfo.join(', ');

            return response.success(`Foi atualizado a interação ${message} com sucesso`);
        } catch (error) {
            return response.error(error);
        }
    };
}
