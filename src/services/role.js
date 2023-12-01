const roleModel = require('../models/role');
const ResponseOn = require('../config/utils/response');

const response = new ResponseOn();

const getAll = async () => {
    try {
        const roles = await roleModel.getAll();

        if (roles.length === 0 || !roles) {
            return response.error('Nenhum gênero encontrado', 404);
        }

        return response.success(roles, 200);

    } catch (error) {
        return response.error(error, 500);
    }
};

const getById = async (id) => {
    try {
        if (!id) {
            return response.error('O id é obrigatório', 400);
        }

        const role = await roleModel.getById(id);

        if (!role) {
            return response.error(`Gênero de id ${id} não encontrado`, 404);
        }

        return response.success(role, 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const create = async (name, description) => {
    try {
        if (!name || !description) {
            return response.error('O nome e a descrição são obrigatórios', 400);
        }

        const checkroleExist = await roleModel.getByName(name);

        if (!checkroleExist) {
            return response.error('O gênero já existe', 400);
        }

        await roleModel.create(name, description);

        return response.success('Gênero foi criado com sucesso', 201);
    } catch (error) {
        return response.error(error, 500);
    }
};

const update = async (id, name, description) => {
    try {
        if (!id || !name || !description) {
            return response.error('O id, o nome e a descrição são obrigatórios', 400);
        }

        const checkroleExist = await roleModel.getById(id);

        if (!checkroleExist) {
            return response.error(`Gênero de id ${id} não encontrado`, 404);
        }
        
        await roleModel.update(id, name, description);

        return response.success('Gênero foi atualizado com sucesso', 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const exclude = async (id) => {
    try {
        if (!id) {
            return response.error('O id é obrigatório', 400);
        }

        const checkroleExist = await roleModel.getById(id);

        if (!checkroleExist) {
            response.error(`Gênero de id ${id} não encontrado`, 404);
        }

        await roleModel.exclude(id);

        return response.success('Gênero foi excluído com sucesso', 200);
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