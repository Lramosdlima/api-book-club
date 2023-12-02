const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ResponseOn = require('../config/utils/response');
const userModel = require('../models/user');

const response = new ResponseOn();

const login = async (email, password) => {
    try {
        if (!email || !password) {
            return response.error('O email e a senha são obrigatórios', 400);
        }

        const user = await userModel.getByEmail(email);

        if (!user || user.length === 0) {
            return response.error('Crendenciais inválidas', 401);
        }

        const passwordStored = user[0].password;

        const comparePassword = bcrypt.compareSync(password, passwordStored);

        if (!comparePassword) {
            return response.error('Crendenciais inválidas', 401);
        }

        const expiresIn = process.env.EXPIRES_TOKEN || '86400';

        const accessToken = jwt.sign(
            { user_id: user[0].id }, 
            process.env.JWT_SECRET,
            { expiresIn },
        );

        const responseFinal = {
            user_id: user[0].id,
            name: user[0].name,
            accessToken,
        };

        return response.success(responseFinal, 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const register = async (name, email, password) => {
    try {
        if (!name || !email || !password) {
            return response.error('O nome, o email e a senha são obrigatórios', 400);
        }

        const checkUserExist = await userModel.getByEmail(email);

        console.log(checkUserExist);

        if (checkUserExist.length > 0) {
            return response.error('Email inválido', 400);
        }
        
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        await userModel.create(name, email, hashedPassword);

        return response.success('Usuário criado com sucesso', 201);
    } catch (error) {
        return response.error(error, 500);
    }
};

const forgotPassword = async (email) => {
    try {
        if (!email) {
            return response.error('O email é obrigatório', 400);
        }

        const user = await userModel.getByEmail(email);

        if (!user || user.length === 0) {
            return response.error('Email inválido', 400);
        }

        // const enviarEmail = await sendEmail(email);

        // if (!enviarEmail) {
        //     return response.error('Não foi possível enviar o email', 500);
        // }

        return response.success('Email enviado com sucesso', 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const resetPassword = async (token, password) => {
    try {
        if (!token || !password) {
            return response.error('O token e a senha são obrigatórios', 400);
        }
        
        const user = await userModel.getByToken(token);

        if (!user || user.length === 0) {
            return response.error('Token inválido', 400);
        }

        const comparePassword = bcrypt.compareSync(password, user[0].password);

        if (comparePassword) {
            return response.error('A nova senha não pode ser igual a senha atual', 400);
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        await userModel.updatePassword(user[0].id, hashedPassword);

        return response.success('Senha alterada com sucesso', 200);

    } catch (error) {
        return response.error(error, 500);
    }
};

module.exports = {
    login,
    register,
    forgotPassword,
    resetPassword,
};