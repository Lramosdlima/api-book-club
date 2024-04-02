import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { UserRepository } from '../repositories/user';
import { ILoginResponse, IUserToken } from '../types/interface';
import { HttpStatus } from '../types/http_status_type';

const response = new ResponseOn();
const userRepository = new UserRepository();

export class AuthService {
    login = async (email: string, password: string): Promise<APIResponse<ILoginResponse, ErrorTypes>> => {
        try {
            if (!email || !password) {
                return response.error('O email e a senha são obrigatórios', HttpStatus.BAD_REQUEST);
            }

            const user = await userRepository.getByEmail(email);

            if (!user) {
                return response.error('Crendenciais inválidas', HttpStatus.UNAUTHORIZED);
            }

            const passwordStored = user.password;

            const comparePassword = bcrypt.compareSync(password, passwordStored);

            if (!comparePassword) {
                return response.error('Crendenciais inválidas', HttpStatus.UNAUTHORIZED);
            }

            const expiresIn = process.env.EXPIRES_TOKEN || '86400';

            const accessToken = jwt.sign(
                { user_id: user.id }, 
                process.env.JWT_SECRET,
                { expiresIn },
            );

            const responseFinal = {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                accessToken,
            };

            return response.success(responseFinal, HttpStatus.OK);
        } catch (error) {
            return response.error(error);
        }
    };

    register = async (name: string, email: string, password: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!name || !email || !password) {
                return response.error('O nome, o email e a senha são obrigatórios', HttpStatus.BAD_REQUEST);
            }

            const checkUserExist = await userRepository.getByEmail(email);

            if (checkUserExist) {
                return response.error('Email inválido', HttpStatus.BAD_REQUEST);
            }
        
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const roleIdDefault = 2;

            await userRepository.create({name, email, password: hashedPassword, role_id: roleIdDefault});

            return response.success('Usuário criado com sucesso', HttpStatus.CREATED);
        } catch (error) {
            return response.error(error);
        }
    };

    forgotPassword = async (email: string) => {
        try {
            if (!email) {
                return response.error('O email é obrigatório', HttpStatus.BAD_REQUEST);
            }

            const user = await userRepository.getByEmail(email);

            if (!user) {
                return response.error('Email inválido', HttpStatus.BAD_REQUEST);
            }

            // TODO: Serviço de envio de email

            // const enviarEmail = await sendEmail(email);

            // if (!enviarEmail) {
            //     return response.error('Não foi possível enviar o email', HttpStatus.INTERNAL_SERVER_ERROR);
            // }

            return response.success('Email enviado com sucesso', HttpStatus.OK);
        } catch (error) {
            return response.error(error);
        }
    };

    resetPassword = async (token: string, password: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!token || !password) {
                return response.error('O token e a senha são obrigatórios', HttpStatus.BAD_REQUEST);
            }
    
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as IUserToken;

            const  user = await userRepository.getById(decoded.user_id);

            if (!user) {
                return response.error('Token inválido', HttpStatus.BAD_REQUEST);
            }

            const comparePassword = bcrypt.compareSync(password, user.password);

            if (comparePassword) {
                return response.error('A nova senha não pode ser igual a senha atual', HttpStatus.BAD_REQUEST);
            }

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            await userRepository.updatePassword(user.id, hashedPassword);

            return response.success('Senha alterada com sucesso', HttpStatus.OK);

        } catch (error) {
            return response.error(error);
        }
    };
}