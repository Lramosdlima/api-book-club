const userModel = require('../models/user');
const ResponseOn = require('../config/utils/response');

const response = new ResponseOn();

const getAll = async () => {
    try {
        const users = await userModel.getAll();

        if (users.length === 0 || !users) {
            return response.error('Nenhum usuário encontrado', 404);
        }

        return response.success(users, 200);

    } catch (error) {
        return response.error(error, 500);
    }
};

const getById = async (id) => {
    try {
        if (!id) {
            return response.error('O id é obrigatório', 400);
        }

        const user = await userModel.getById(id);

        if (!user) {
            return response.error(`Usuário de id ${id} não encontrado`, 404);
        }

        return response.success(user, 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const create = async (name, email, password) => {
    try {
        if (!name || !email || !password) {
            return response.error('O nome, o email e a senha são obrigatórios', 400);
        }

        const checkUserExist = await userModel.getByEmail(email);

        if (!checkUserExist) {
            return response.error('O usuário já existe', 400);
        }

        await userModel.create(name, email, password);

        return response.success('Usuário foi criado com sucesso', 201);
    } catch (error) {
        return response.error(error, 500);
    }
};

const update = async (id, name, email) => {
    try {
        if (!id) {
            return response.error('O id do usuário é obrigatório', 400);
        }

        const checkUserExist = await userModel.getById(id);

        if (!checkUserExist) {
            return response.error(`Usuário de id ${id} não encontrado`, 404);
        }
        
        await userModel.update(id, name, email);

        return response.success('Usuário foi atualizado com sucesso', 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const exclude = async (id) => {
    try {
        if (!id) {
            return response.error('O id é obrigatório', 400);
        }

        const checkUserExist = await userModel.getById(id);

        if (!checkUserExist) {
            response.error(`Usuário de id ${id} não encontrado`, 404);
        }

        await userModel.exclude(id);

        return response.success('Usuário foi excluído com sucesso', 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    exclude,
};