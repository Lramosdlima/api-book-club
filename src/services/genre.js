const genreModel = require('../models/genre');
const ResponseOn = require('../config/utils/response');

const response = new ResponseOn();

const getAll = async () => {
    try {
        const genres = await genreModel.getAll();

        if (genres.length === 0 || !genres) {
            return response.error('Nenhum gênero encontrado', 404);
        }

        return response.success(genres, 200);

    } catch (error) {
        return response.error(error, 500);
    }
};

const getById = async (id) => {
    try {
        if (!id) {
            return response.error('O id é obrigatório', 400);
        }

        const genre = await genreModel.getById(id);

        if (!genre) {
            return response.error(`Gênero de id ${id} não encontrado`, 404);
        }

        return response.success(genre, 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const create = async (name, description) => {
    try {
        if (!name || !description) {
            return response.error('O nome e a descrição são obrigatórios', 400);
        }

        const checkGenreExist = await genreModel.getByName(name);

        if (!checkGenreExist) {
            return response.error('O gênero já existe', 400);
        }

        await genreModel.create(name, description);

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

        const checkGenreExist = await genreModel.getById(id);

        if (!checkGenreExist) {
            return response.error(`Gênero de id ${id} não encontrado`, 404);
        }
        
        await genreModel.update(id, name, description);

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

        const checkGenreExist = await genreModel.getById(id);

        if (!checkGenreExist) {
            response.error(`Gênero de id ${id} não encontrado`, 404);
        }

        await genreModel.exclude(id);

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