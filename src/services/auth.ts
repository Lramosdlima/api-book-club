import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { APIResponse, ErrorTypes, ResponseOn } from '../config/utils/response';
import { UserRepository } from '../repositories/user';
import { ILoginResponse, IResetPasswordToken, RoleEnum } from '../types/interface';
import { HttpStatus } from '../types/http_status_type';
import { resetPasswordEmail } from '../config/utils/reset_password_email';

const response = new ResponseOn();
const userRepository = new UserRepository();

export class AuthService {
    login = async (email: string, password: string): Promise<APIResponse<ILoginResponse, ErrorTypes>> => {
        try {
            if (!email || !password) {
                return response.unsuccessfully('O email e a senha são obrigatórios');
            }

            const user = await userRepository.getByEmail(email);

            if (!user) {
                return response.unsuccessfully('Crendenciais inválidas', HttpStatus.UNAUTHORIZED);
            }

            const passwordStored = user.password;

            const comparePassword = bcrypt.compareSync(password, passwordStored);

            if (!comparePassword) {
                return response.unsuccessfully('Crendenciais inválidas', HttpStatus.UNAUTHORIZED);
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
                    profile_picture: user.profile_picture,
                },
                accessToken,
            };

            return response.success(responseFinal);
        } catch (error) {
            return response.error(error);
        }
    };

    register = async (name: string, email: string, password: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!name || !email || !password) {
                return response.unsuccessfully('O nome, o email e a senha são obrigatórios');
            }

            const checkUserExist = await userRepository.getByEmail(email);

            if (checkUserExist) {
                return response.unsuccessfully('Email inválido');
            }
        
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const roleIdDefault = RoleEnum.USER;

            await userRepository.create({name, email, password: hashedPassword, role_id: roleIdDefault});

            return response.success('Usuário criado com sucesso', HttpStatus.CREATED);
        } catch (error) {
            return response.error(error);
        }
    };

    forgotPassword = async (email: string, password: string) => {
        try {
            if (!email || !password) {
                return response.unsuccessfully('O email e a senha são obrigatórios');
            }

            const user = await userRepository.getByEmail(email);

            if (!user) {
                return response.unsuccessfully('Email inválido');
            }

            const comparePassword = bcrypt.compareSync(password, user.password);

            if (comparePassword) {
                return response.unsuccessfully('A nova senha não pode ser igual a senha atual');
            }

            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const bodyToken: IResetPasswordToken = { user_id: user.id, password: hashedPassword };

            const token = jwt.sign(
                bodyToken,
                process.env.JWT_SECRET,
                { expiresIn: process.env.EXPIRES_PASSWORD_TOKEN || '30m' },
            );

            const enviarEmail = await resetPasswordEmail(email, token);

            if (!enviarEmail.status) {
                return response.unsuccessfully(enviarEmail.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return response.success(enviarEmail.message);
        } catch (error) {
            return response.error(error);
        }
    };

    resetPassword = async (token: string): Promise<APIResponse<string, ErrorTypes>> => {
        try {
            if (!token) {
                return response.unsuccessfully('O token é obrigatório');
            }
    
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as IResetPasswordToken;

            if (!decoded) {
                return response.unsuccessfully('Token inválido');
            }

            await userRepository.updatePassword(decoded.user_id, decoded.password);

            return response.success('Senha alterada com sucesso');

        } catch (error) {
            return response.error(error);
        }
    };
}