const communityUserModel = require('../models/communityUser');
const ResponseOn = require('../config/utils/response');

const response = new ResponseOn();

const getAll = async () => {
    try {
        const communityUsers = await communityUserModel.getAll();

        if (communityUsers.length === 0 || !communityUsers) {
            return response.error('Nenhum comunidade encontrada', 404);
        }

        return response.success(communityUsers, 200);

    } catch (error) {
        return response.error(error, 500);
    }
};

const getById = async (id) => {
    try {
        if (!id) {
            return response.error('O id é obrigatório', 400);
        }

        const communityUser = await communityUserModel.getById(id);

        if (!communityUser) {
            return response.error(`Comunidade de id ${id} não encontrada`, 404);
        }

        return response.success(communityUser, 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const create = async (name, description) => {
    try {
        if (!name || !description) {
            return response.error('O nome e a descrição são obrigatórios', 400);
        }

        const checkcommunityUserExist = await communityUserModel.getByName(name);

        if (!checkcommunityUserExist) {
            return response.error('O comunidade já existe', 400);
        }

        await communityUserModel.create(name, description);

        return response.success('Comunidade foi criada com sucesso', 201);
    } catch (error) {
        return response.error(error, 500);
    }
};

const update = async (id, name, description) => {
    try {
        if (!id || !name || !description) {
            return response.error('O id, o nome e a descrição são obrigatórios', 400);
        }

        const checkcommunityUserExist = await communityUserModel.getById(id);

        if (!checkcommunityUserExist) {
            return response.error(`Comunidade de id ${id} não encontrada`, 404);
        }
        
        await communityUserModel.update(id, name, description);

        return response.success('Comunidade foi atualizada com sucesso', 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const exclude = async (id) => {
    try {
        if (!id) {
            return response.error('O id é obrigatório', 400);
        }

        const checkcommunityUserExist = await communityUserModel.getById(id);

        if (!checkcommunityUserExist) {
            response.error(`Comunidade de id ${id} não encontrada`, 404);
        }

        await communityUserModel.exclude(id);

        return response.success('Comunidade foi excluída com sucesso', 200);
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