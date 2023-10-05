const communityChatModel = require('../models/communityChat');
const ResponseOn = require('../config/utils/response');

const response = new ResponseOn();

const getAll = async () => {
    try {
        const communityChats = await communityChatModel.getAll();

        if (communityChats.length === 0 || !communityChats) {
            return response.error('Mensagem no chat não foi encontrado', 404);
        }

        return response.success(communityChats, 200);

    } catch (error) {
        return response.error(error, 500);
    }
};

const getById = async (id) => {
    try {
        if (!id) {
            return response.error('O id é obrigatório', 400);
        }

        const communityChat = await communityChatModel.getById(id);

        if (!communityChat) {
            return response.error(`Chat de id ${id} não encontrado`, 404);
        }

        return response.success(communityChat, 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const create = async (community_user_id, message) => {
    try {
        if (!community_user_id || !message) {
            return response.error('O id do usuário e a mensagem são obrigatórios', 400);
        }

        const checkCommunityChatExist = await communityChatModel.getByName(name);

        if (!checkCommunityChatExist) {
            return response.error('Mensagem no chat já existe', 400);
        }

        await communityChatModel.create(community_user_id, message);

        return response.success('Mensagem no chat foi criado com sucesso', 201);
    } catch (error) {
        return response.error(error, 500);
    }
};

const update = async (id, community_user_id, message) => {
    try {
        if (!id || !community_user_id || !message) {
            return response.error('O id do chat, o id do usuário e a mensagem são obrigatórios', 400);
        }

        const checkCommunityChatExist = await communityChatModel.getById(id);

        if (!checkCommunityChatExist) {
            return response.error(`Chat de id ${id} não encontrado`, 404);
        }
        
        await communityChatModel.update(id, community_user_id, message);

        return response.success('Mensagem no chat foi atualizado com sucesso', 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const exclude = async (id) => {
    try {
        if (!id) {
            return response.error('O id é obrigatório', 400);
        }

        const checkCommunityChatExist = await communityChatModel.getById(id);

        if (!checkCommunityChatExist) {
            response.error(`O id ${id} não encontrado`, 404);
        }

        await communityChatModel.exclude(id);

        return response.success('Mensagem no chat foi excluído com sucesso', 200);
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