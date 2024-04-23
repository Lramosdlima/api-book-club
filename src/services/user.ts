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
                return response.unsuccessfully('Nenhum usuário encontrado', HttpStatus.NOT_FOUND);
            }

            return response.success(users);

        } catch (error) {
            return response.error(error);
        }
    };

    getById = async (id: number): Promise<APIResponse<UserEntity | null, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const user = await userRepository.getById(id);

            if (!user) {
                return response.unsuccessfully(`Usuário de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            return response.success(user);
        } catch (error) {
            return response.error(error);
        }
    };

    update = async (id: number, name: string, email: string): Promise<APIResponse<string | null, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id do usuário é obrigatório');
            }

            const checkUserExist = await userRepository.getById(id);

            if (!checkUserExist) {
                return response.unsuccessfully(`Usuário de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }
        
            await userRepository.update(id, { name, email });

            return response.success('Usuário foi atualizado com sucesso');
        } catch (error) {
            return response.error(error);
        }
    };

    exclude = async (id: number): Promise<APIResponse<string | null, ErrorTypes>> => {
        try {
            if (!id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const checkUserExist = await userRepository.getById(id);

            if (!checkUserExist) {
                response.unsuccessfully(`Usuário de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            await userRepository.exclude(id);

            return response.success('Usuário foi excluído com sucesso');
        } catch (error) {
            return response.error(error);
        }
    };
}