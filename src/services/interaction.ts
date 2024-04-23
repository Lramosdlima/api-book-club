import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { InteractionEntity } from '../entities/interaction';
import { BookRepository } from '../repositories/book';
import { InteractionRepository } from '../repositories/interaction';
import { UserRepository } from '../repositories/user';
import { CreateInteractionDTO, UpdateInteractionDTO } from '../types/dto';
import { HttpStatus } from '../types/http_status_type';

const response = new ResponseOn();
const interactionRepository = new InteractionRepository();
const userRepository = new UserRepository();
const bookRepository = new BookRepository();

export class InteractionService {
    getAllInteractionsByBookId = async (book_id: number, page?: number, limit?: number): Promise<APIResponse<InteractionEntity[], ErrorTypes>> => {
        try {
            if (!book_id) {
                return response.unsuccessfully('O id do livro é obrigatório');
            }

            const interactions = await interactionRepository.getAllByBookId(book_id, page, limit);

            if (interactions.length === 0 || !interactions) {
                return response.unsuccessfully('Nenhuma interação no livro do usuário foi encontrada', HttpStatus.NOT_FOUND);
            }

            return response.success(interactions);

        } catch (error) {
            return response.error(error);
        }
    };

    getAllInteractionsByUserId = async (user_id: number, page?: number, limit?: number): Promise<APIResponse<InteractionEntity[] | null, ErrorTypes>> => {
        try {
            if (!user_id) {
                return response.unsuccessfully('O id do usuário é obrigatório');
            }

            const interaction = await interactionRepository.getAllByUserId(user_id, page, limit);

            if (!interaction) {
                return response.unsuccessfully(`Interação no livro desse usuário ${user_id} não foi encontrado`, HttpStatus.NOT_FOUND);
            }

            return response.success(interaction);
        } catch (error) {
            return response.error(error);
        }
    };

    getEspecificInteractionsByUserId = async (user_id: number, already_read: boolean, want_to_read: boolean, liked: boolean): Promise<APIResponse<InteractionEntity[] | null, ErrorTypes>> => {
        try {
            if (!user_id) {
                return response.unsuccessfully('O id do usuário é obrigatório');
            }

            const interaction = await interactionRepository.getEspecificByUserId(user_id, already_read, want_to_read, liked);

            if (!interaction) {
                return response.unsuccessfully(`Interação no livro desse usuário ${user_id} não foi encontrada`, HttpStatus.NOT_FOUND);
            }

            return response.success(interaction);

        } catch (error) {
            return response.error(error);
        }
    };

    add = async (createInteractionDTO: CreateInteractionDTO): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            const { user_id, book_id, already_read, want_to_read, liked } = createInteractionDTO;

            if (!user_id || !book_id) {
                return response.unsuccessfully('O id do usuário e do livro são obrigatórios');
            }

            const checkUserExist = await userRepository.getById(user_id);

            if (!checkUserExist) {
                return response.unsuccessfully('Usuário não foi encontrado', HttpStatus.NOT_FOUND);
            }

            const checkBookExist = await bookRepository.getById(book_id);

            if (!checkBookExist) {
                return response.unsuccessfully('O livro não foi encontrado', HttpStatus.NOT_FOUND);
            }

            const checkInteractionExist = await interactionRepository.getByUserIdAndBookId(user_id, book_id);

            if (checkInteractionExist) {
                await interactionRepository.update(checkInteractionExist.id, { already_read, want_to_read, liked });
            } else {
                await interactionRepository.create({ user_id, book_id, already_read, want_to_read, liked });
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

    update = async (id: number, updateInteractionDTO: UpdateInteractionDTO): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const { already_read, want_to_read, liked } = updateInteractionDTO;

            const checkInteractionExist = await interactionRepository.getById(id);

            if (!checkInteractionExist) {
                return response.unsuccessfully(`Interação no livro ${id} do usuário não encontrada`, HttpStatus.NOT_FOUND);
            }
        
            await interactionRepository.update(id, updateInteractionDTO);

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
