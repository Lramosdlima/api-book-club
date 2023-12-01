const highlightModel = require('../models/highlight');
const ResponseOn = require('../config/utils/response');

const response = new ResponseOn();

const getAll = async () => {
    try {
        const highlights = await highlightModel.getAll();

        if (highlights.length === 0 || !highlights) {
            return response.error('Nenhum gênero encontrado', 404);
        }

        return response.success(highlights, 200);

    } catch (error) {
        return response.error(error, 500);
    }
};

const getById = async (id) => {
    try {
        if (!id) {
            return response.error('O id é obrigatório', 400);
        }

        const highlight = await highlightModel.getById(id);

        if (!highlight) {
            return response.error(`Gênero de id ${id} não encontrado`, 404);
        }

        return response.success(highlight, 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const create = async (name, description) => {
    try {
        if (!name || !description) {
            return response.error('O nome e a descrição são obrigatórios', 400);
        }

        const checkhighlightExist = await highlightModel.getByName(name);

        if (!checkhighlightExist) {
            return response.error('O gênero já existe', 400);
        }

        await highlightModel.create(name, description);

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

        const checkhighlightExist = await highlightModel.getById(id);

        if (!checkhighlightExist) {
            return response.error(`Gênero de id ${id} não encontrado`, 404);
        }
        
        await highlightModel.update(id, name, description);

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

        const checkhighlightExist = await highlightModel.getById(id);

        if (!checkhighlightExist) {
            response.error(`Gênero de id ${id} não encontrado`, 404);
        }

        await highlightModel.exclude(id);

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