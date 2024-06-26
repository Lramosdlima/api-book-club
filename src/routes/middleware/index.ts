import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../repositories/user';
import { IUserToken } from '../../types/interface';
import { HttpStatus } from '../../types/http_status_type';

const userRepository = new UserRepository();

export class Middleware {
    async auth(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        try {
            if (!token) throw new Error('Token não fornecido');

            const parts = token.split(' ');
            if (parts.length !== 2) throw new Error('Token error');

            const [scheme, tokenHash] = parts;
            if (scheme !== 'Bearer') throw new Error('Token malformado');

            if (!tokenHash) throw new Error('Token inválido');

            const decoded = jwt.verify(tokenHash, process.env.JWT_SECRET) as IUserToken;

            const  user = await userRepository.getById(decoded.user_id);

            if (!user) throw new Error('Faça login para acessar sua conta');

            req.userId = Number(user.id);

            return next();
        } catch (error) {
            console.log(error);
            return res.status(HttpStatus.UNAUTHORIZED).json({ status: false, data: null, error: error || 'Faça login para utilizar essa funcionalidade' });
        }
    }
}
