const authorModel = require('../models/author');

const getAll = async () => {
    try {
        const authors = await authorModel.getAll();

        if (authors.length === 0) {
            return 'Nenhum autor encontrado';
        }
        return authors;
    } catch (error) {
        return error;
    }
};

const getById = async (id) => {
    try {
        const author = await authorModel.getById(id);

        if (!author) {
            return `Autor de id ${id} não encontrado`;
        }

        return author;
    } catch (error) {
        return error;
    }
};

const create = async (name, description) => {
    try {
        const checkAuthorExist = await authorModel.getByName(name);

        if (!checkAuthorExist) {
            return 'O autor já existe';
        }

        const createdAuthor = await authorModel.create(name, description);
        return createdAuthor;
    } catch (error) {
        return error;
    }
};

const update = async (id, name, description) => {
    try {
        const checkAuthorExist = await authorModel.getById(id);

        if (!checkAuthorExist) {
            return `Autor de id ${id} não encontrado`;
        }
        
        const updatedAuthor = await authorModel.update(id, name, description);
        return updatedAuthor;
    } catch (error) {
        return error;
    }
};

const exclude = async (id) => {
    try {
        const checkAuthorExist = await authorModel.getById(id);

        if (!checkAuthorExist) {
            return `Autor de id ${id} não encontrado`;
        }

        await authorModel.exclude(id);
        return 'Autor excluído com sucesso';
    } catch (error) {
        return error;
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    exclude,
};