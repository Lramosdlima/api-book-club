const bookModel = require('../models/book');
const ResponseOn = require('../config/utils/response');

const response = new ResponseOn();

const getAll = async () => {
    try {
        const books = await bookModel.getAll();

        if (books.length === 0 || !books) {
            return response.error('Nenhum livro encontrado', 404);
        }

        return response.success(books, 200);

    } catch (error) {
        return response.error(error, 500);
    }
};

const getById = async (id) => {
    try {
        if (!id) {
            return response.error('O id é obrigatório', 400);
        }

        const book = await bookModel.getById(id);

        if (!book) {
            return response.error(`Livro de id ${id} não encontrado`, 404);
        }

        return response.success(book, 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const create = async (title, synopsis, genre_id) => {
    try {
        if (!title || !synopsis || !genre_id) {
            return response.error('O nome, descrição e o id do gênero são obrigatórios', 400);
        }

        const checkBookExist = await bookModel.getByTitle(title);

        if (!checkBookExist) {
            return response.error('O livro já existe', 400);
        }

        await bookModel.create(title, synopsis, genre_id);

        return response.success('Livro foi criado com sucesso', 201);
    } catch (error) {
        return response.error(error, 500);
    }
};

const update = async (id, title, synopsis) => {
    try {
        if (!id || !title || !synopsis) {
            return response.error('O id, o nome e a descrição são obrigatórios', 400);
        }

        const checkBookExist = await bookModel.getById(id);

        if (!checkBookExist) {
            return response.error(`Livro de id ${id} não encontrado`, 404);
        }
        
        await bookModel.update(id, title, synopsis);

        return response.success('Livro foi atualizado com sucesso', 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const exclude = async (id) => {
    try {
        if (!id) {
            return response.error('O id é obrigatório', 400);
        }

        const checkBookExist = await bookModel.getById(id);

        if (!checkBookExist) {
            response.error(`Livro de id ${id} não encontrado`, 404);
        }

        await bookModel.exclude(id);

        return response.success('Livro foi excluído com sucesso', 200);
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