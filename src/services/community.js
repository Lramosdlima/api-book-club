const communityModel = require('../models/community');
const ResponseOn = require('../config/utils/response');

const response = new ResponseOn();

const getAll = async () => {
    try {
        const communitys = await communityModel.getAll();

        if (communitys.length === 0 || !communitys) {
            return response.error('Nenhum comunidade encontrada', 404);
        }

        return response.success(communitys, 200);

    } catch (error) {
        return response.error(error, 500);
    }
};

const getById = async (id) => {
    try {
        if (!id) {
            return response.error('O id é obrigatório', 400);
        }

        const community = await communityModel.getById(id);

        if (!community) {
            return response.error(`Comunidade de id ${id} não encontrada`, 404);
        }

        return response.success(community, 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const create = async (name, description) => {
    try {
        if (!name || !description) {
            return response.error('O nome e a descrição são obrigatórios', 400);
        }

        const checkCommunityExist = await communityModel.getByName(name);

        if (!checkCommunityExist) {
            return response.error('O comunidade já existe', 400);
        }

        await communityModel.create(name, description);

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

        const checkCommunityExist = await communityModel.getById(id);

        if (!checkCommunityExist) {
            return response.error(`Comunidade de id ${id} não encontrada`, 404);
        }
        
        await communityModel.update(id, name, description);

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

        const checkCommunityExist = await communityModel.getById(id);

        if (!checkCommunityExist) {
            response.error(`Comunidade de id ${id} não encontrada`, 404);
        }

        await communityModel.exclude(id);

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