const authorModel = require('../models/author');
const ResponseOn = require('../config/utils/response');

const response = new ResponseOn();

const getAll = async () => {
    try {
        const authors = await authorModel.getAll();

        if (authors.length === 0 || !authors) {
            return response.error('Nenhum autor encontrado', 404);
        }

        return response.success(authors, 200);

    } catch (error) {
        return response.error(error, 500);
    }
};

const getById = async (id) => {
    try {
        if (!id) {
            return response.error('O id é obrigatório', 400);
        }

        const author = await authorModel.getById(id);

        if (!author) {
            return response.error(`Autor de id ${id} não encontrado`, 404);
        }

        return response.success(author, 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const create = async (name, description) => {
    try {
        if (!name || !description) {
            return response.error('O nome e a descrição são obrigatórios', 400);
        }

        const checkAuthorExist = await authorModel.getByName(name);

        if (!checkAuthorExist) {
            return response.error('O autor já existe', 400);
        }

        await authorModel.create(name, description);

        return response.success('Autor foi criado com sucesso', 201);
    } catch (error) {
        return response.error(error, 500);
    }
};

const update = async (id, name, description) => {
    try {
        if (!id || !name || !description) {
            return response.error('O id, o nome e a descrição são obrigatórios', 400);
        }

        const checkAuthorExist = await authorModel.getById(id);

        if (!checkAuthorExist) {
            return response.error(`Autor de id ${id} não encontrado`, 404);
        }
        
        await authorModel.update(id, name, description);

        return response.success('Autor foi atualizado com sucesso', 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const exclude = async (id) => {
    try {
        if (!id) {
            return response.error('O id é obrigatório', 400);
        }

        const checkAuthorExist = await authorModel.getById(id);

        if (!checkAuthorExist) {
            response.error(`Autor de id ${id} não encontrado`, 404);
        }

        await authorModel.exclude(id);

        return response.success('Autor foi excluído com sucesso', 200);
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