const bookModel = require('../models/book');

const getAll = async () => {
    try {
        const books = await bookModel.getAll();

        if (books.length === 0) {
            return 'Nenhum livro encontrado';
        }
        return books;
    } catch (error) {
        return error;
    }
};

const getById = async (id) => {
    try {
        const book = await bookModel.getById(id);

        if (!book) {
            return `Livro de id ${id} não encontrado`;
        }

        return book;
    } catch (error) {
        return error;
    }
};

const create = async (title, synopsis, genre_id) => {
    try {
        const book = await bookModel.create(title, synopsis, genre_id);
        return book;
    } catch (error) {
        return error;
    }
};

const update = async (id, title, synopsis, genre_id) => {
    try {
        const result = await bookModel.update(id, title, synopsis, genre_id);
        return result;
    } catch (error) {
        return error;
    }
};

const exclude = async (id) => {
    try {
        await bookModel.exclude(id);
        return 'Livro excluído com sucesso';
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