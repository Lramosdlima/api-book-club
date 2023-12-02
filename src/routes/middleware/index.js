// const { NextFunction, Request, Response } = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../../models/user');

class Middleware {
    async auth(req, res, next) {
        const token = req.headers.authorization;
        try {
            if (!token) throw new Error('Token não fornecido');

            const parts = token.split(' ');
            if (parts.length !== 2) throw new Error('Token error');

            const [scheme, tokenHash] = parts;
            if (scheme !== 'Bearer') throw new Error('Token malformado');

            if (!tokenHash) throw new Error('Token inválido');

            const decoded = jwt.verify(tokenHash, process.env.JWT_SECRET);

            const  user = await userModel.getById(decoded.user_id);

            if (!user) throw new Error('Faça login para acessar sua conta');

            req.userId = Number(user.id);

            return next();
        } catch (error) {
            return res.status(401).json({ status: false, data: null, error: error.message });
        }
    }
}

module.exports = {
    Middleware,
};
