const bookChallengeModel = require('../models/bookChallenge');
const ResponseOn = require('../config/utils/response');

const response = new ResponseOn();

const getAll = async () => {
    try {
        const bookChallenges = await bookChallengeModel.getAll();

        if (bookChallenges.length === 0 || !bookChallenges) {
            return response.error('Nenhum usuário encontrado', 404);
        }

        return response.success(bookChallenges, 200);

    } catch (error) {
        return response.error(error, 500);
    }
};

const getById = async (id) => {
    try {
        if (!id) {
            return response.error('O id é obrigatório', 400);
        }

        const bookChallenge = await bookChallengeModel.getById(id);

        if (!bookChallenge) {
            return response.error(`Usuário de id ${id} não encontrado`, 404);
        }

        return response.success(bookChallenge, 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const create = async (name, email, password) => {
    try {
        if (!name || !email || !password) {
            return response.error('O nome, o email e a senha são obrigatórios', 400);
        }

        const checkbookChallengeExist = await bookChallengeModel.getByEmail(email);

        if (!checkbookChallengeExist) {
            return response.error('O usuário já existe', 400);
        }

        await bookChallengeModel.create(name, email, password);

        return response.success('Usuário foi criado com sucesso', 201);
    } catch (error) {
        return response.error(error, 500);
    }
};

const update = async (id, name, description) => {
    try {
        if (!id || !name || !description) {
            return response.error('O id, o nome e a descrição são obrigatórios', 400);
        }

        const checkbookChallengeExist = await bookChallengeModel.getById(id);

        if (!checkbookChallengeExist) {
            return response.error(`Usuário de id ${id} não encontrado`, 404);
        }
        
        await bookChallengeModel.update(id, name, description);

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

        const checkbookChallengeExist = await bookChallengeModel.getById(id);

        if (!checkbookChallengeExist) {
            response.error(`Usuário de id ${id} não encontrado`, 404);
        }

        await bookChallengeModel.exclude(id);

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