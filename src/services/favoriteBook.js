const favoritedBookModel = require('../models/favoriteBook');
const bookModel = require('../models/book');
const ResponseOn = require('../config/utils/response');

const response = new ResponseOn();

const getAllByUser = async (user_id) => {
    try {
        if (!user_id) {
            return response.error('O id do usuário é obrigatório', 400);
        }

        const favoritedBook = await favoritedBookModel.getAllByUser(user_id);

        if (favoritedBook.length === 0 || !favoritedBook) {
            return response.error('Nenhum livro favoritado foi encontrado', 404);
        }

        const books = [];

        for (let i = 0; i < favoritedBook.length; i++) {
            const book = await bookModel.getById(favoritedBook[i].book_id);
            books.push({ favorite_id: favoritedBook[i].id, book } );
        }

        const responseFinal = {
            user_id,
            books,
        };

        return response.success(responseFinal, 200);

    } catch (error) {
        return response.error(error, 500);
    }
};

const getById = async (id) => {
    try {
        if (!id) {
            return response.error('O id é obrigatório', 400);
        }

        const favoritedBook = await favoritedBookModel.getById(id);

        if (!favoritedBook) {
            return response.error(`Nenhum livro favoritado de id ${id} foi encontrado`, 404);
        }

        const book = await favoritedBookModel.getBookById(favoritedBook.book_id);

        return response.success(book, 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const create = async (user_id, book_id) => {
    try {
        if (!user_id || !book_id) {
            return response.error('Os campos user_id e book_id são obrigatórios', 400);
        }

        const checkFavoritedBookExist = await favoritedBookModel.getByUserAndBook(user_id, book_id);

        if (checkFavoritedBookExist) {
            return response.error('O livro já foi favoritado', 400);
        }

        const favoritedBook = await favoritedBookModel.create(user_id, book_id);

        return response.success(favoritedBook, 201);
    } catch (error) {
        return response.error(error, 500);
    }
};

const update = async (id, user_id, book_id) => {
    try {
        if (!id) {
            return response.error('O id do livro favoritado é obrigatório', 400);
        }

        if (!user_id || !book_id) {
            return response.error('Os campos user_id e book_id são obrigatórios', 400);
        }

        const favoritedBook = await favoritedBookModel.getById(id);

        if (!favoritedBook) {
            return response.error(`Nenhum livro favoritado de id ${id} foi encontrado`, 404);
        }

        await favoritedBookModel.update(id, user_id, book_id);

        return response.success('Livro favoritado atualizado com sucesso', 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const remove = async (id) => {
    try {
        if (!id) {
            return response.error('O id do livro favoritado é obrigatório', 400);
        }

        const favoritedBook = await favoritedBookModel.getById(id);

        if (!favoritedBook) {
            return response.error(`Nenhum livro favoritado de id ${id} foi encontrado`, 404);
        }

        await favoritedBookModel.remove(id);

        return response.success('Livro favoritado removido com sucesso', 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

module.exports = {
    getAllByUser,
    getById,
    create,
    update,
    remove
};
