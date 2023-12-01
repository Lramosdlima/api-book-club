const bookModel = require('../models/book');
const genreModel = require('../models/genre');
const authorModel = require('../models/author');
const authorBookModel = require('../models/authorBook');
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

const getAllWithCompleteInfo = async () => {
    try {
        const books = await bookModel.getAll();

        if (books.length === 0 || !books) {
            return response.error('Nenhum livro encontrado', 404);
        }

        for (let i = 0; i < books.length; i++) {
            const genre = await genreModel.getById(books[i].genre_id);
            books[i].genre = genre[0].name;
        }

        for (let i = 0; i < books.length; i++) {
            const authorBook = await authorBookModel.getByBookId(books[i].id);
            const authors = [];
            for (let j = 0; j < authorBook.length; j++) {
                const author = await authorModel.getById(authorBook[j].author_id);
                authors.push(author[0].name);
            }
            books[i].authors = authors;
        }

        const finalResponse = books.map((book) => {
            return {
                id: book.id,
                title: book.title,
                synopsis: book.synopsis,
                genre: book.genre,
                imageUrl: book.urlImage,
                authors: book.authors,
            };
        });

        return response.success(finalResponse, 200);

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

const create = async (title, synopsis, urlImage, genre_id) => {
    try {
        if (!title || !synopsis || !genre_id) {
            return response.error('O nome, descrição e o id do gênero são obrigatórios', 400);
        }

        const checkBookExist = await bookModel.getByTitle(title);

        if (!checkBookExist) {
            return response.error('O livro já existe', 400);
        }

        await bookModel.create(title, synopsis, urlImage, genre_id);

        return response.success('Livro foi criado com sucesso', 201);
    } catch (error) {
        return response.error(error, 500);
    }
};

const update = async (id, title, synopsis, urlImage, genre_id) => {
    try {
        if (!id ) {
            return response.error('O id do livro é obrigatório', 400);
        }

        const checkBookExist = await bookModel.getById(id);

        if (!checkBookExist) {
            return response.error(`Livro de id ${id} não encontrado`, 404);
        }
        
        await bookModel.update(id, title, synopsis, urlImage, genre_id);

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

const getByTitle = async (title) => {
    try {
        if (!title) {
            return response.error('O título é obrigatório', 400);
        }

        const book = await bookModel.getByTitle(title);

        if (!book) {
            return response.error(`Livro de título ${title} não encontrado`, 404);
        }

        return response.success(book, 200);

    } catch (error) {
        return response.error(error, 500);
    }
};

const createWithCompleteInfo = async (title, synopsis, urlImage, genre_id, author ) => {
    try {
        if (!title || !synopsis || !urlImage || !genre_id || !author ) {
            return response.error('Dados inválidos', 400);
        }

        const checkBookExist = await bookModel.getByTitle(title);

        if (!checkBookExist) {
            return response.error('O livro já existe', 400);
        }

        const checkGenreExist = await genreModel.getById(genre_id);

        if (!checkGenreExist) {
            return response.error('O gênero não existe', 400);
        }

        const book = await bookModel.create(title, synopsis, genre_id, urlImage);

        const authorExist = await authorModel.getByName(author);

        if (!authorExist) {
            const newAuthor = await authorModel.create(author);

            await authorBookModel.create(newAuthor.id, book.id);
        } else {
            await authorBookModel.create(authorExist.id, book.id);
        }

        return response.success('Livro foi criado com sucesso', 201);
    } catch (error) {
        return response.error(error, 500);
    }
};

module.exports = {
    getAll,
    getAllWithCompleteInfo,
    getById,
    getByTitle,
    create,
    update,
    exclude,
    createWithCompleteInfo,
};