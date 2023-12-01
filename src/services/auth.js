const bcrypt = require('bcryptjs');
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

        return response.success('Login realizado com sucesso', 200);
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

module.exports = {
    login,
    register
};