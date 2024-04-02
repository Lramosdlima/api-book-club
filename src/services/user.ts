import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { UserEntity } from '../entities/user';
import { UserRepository } from '../repositories/user';
import { HttpStatus } from '../types/http_status_type';

const response = new ResponseOn();
const userRepository = new UserRepository();

export class UserService {
    getAll = async (page?: number, limit?: number): Promise<APIResponse<UserEntity[], ErrorTypes>> => {
        try {
            const users = await userRepository.getAll(page, limit);

            if (users.length === 0 || !users) {
                return response.error('Nenhum usuário encontrado', HttpStatus.NOT_FOUND);
            }

            return response.success(users, HttpStatus.OK);

        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    getById = async (id: number): Promise<APIResponse<UserEntity | null, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', HttpStatus.BAD_REQUEST);
            }

            const user = await userRepository.getById(id);

            if (!user) {
                return response.error(`Usuário de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            return response.success(user, HttpStatus.OK);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    update = async (id: number, name: string, email: string): Promise<APIResponse<string | null, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id do usuário é obrigatório', HttpStatus.BAD_REQUEST);
            }

            const checkUserExist = await userRepository.getById(id);

            if (!checkUserExist) {
                return response.error(`Usuário de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }
        
            await userRepository.update(id, { name, email });

            return response.success('Usuário foi atualizado com sucesso', HttpStatus.OK);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    exclude = async (id: number): Promise<APIResponse<string | null, ErrorTypes>> => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', HttpStatus.BAD_REQUEST);
            }

            const checkUserExist = await userRepository.getById(id);

            if (!checkUserExist) {
                response.error(`Usuário de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            await userRepository.exclude(id);

            return response.success('Usuário foi excluído com sucesso', HttpStatus.OK);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
}