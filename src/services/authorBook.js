const authorBookModel = require('../models/authorBook');
const genreModel = require('../models/genre');
const ResponseOn = require('../config/utils/response');

const response = new ResponseOn();

const getAll = async () => {
    try {
        const authorBooks = await authorBookModel.getAll();

        if (authorBooks.length === 0 || !authorBooks) {
            return response.error('Nenhum livro encontrado', 404);
        }

        return response.success(authorBooks, 200);

    } catch (error) {
        return response.error(error, 500);
    }
};

const getAllWithCompleteInfo = async () => {
    try {
        const authorBooks = await authorBookModel.getAll();

        if (authorBooks.length === 0 || !authorBooks) {
            return response.error('Nenhum livro encontrado', 404);
        }

        for (let i = 0; i < authorBooks.length; i++) {
            const genre = await genreModel.getById(authorBooks[i].genre_id);
            authorBooks[i].genre = genre[0].name;
        }

        const finalResponse = authorBooks.map((authorBook) => {
            return {
                title: authorBook.title,
                synopsis: authorBook.synopsis,
                genre: authorBook.genre,
                imageUrl: authorBook.urlImage,
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

        const authorBook = await authorBookModel.getById(id);

        if (!authorBook) {
            return response.error(`Livro de id ${id} não encontrado`, 404);
        }

        return response.success(authorBook, 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const create = async (title, synopsis, genre_id) => {
    try {
        if (!title || !synopsis || !genre_id) {
            return response.error('O nome, descrição e o id do gênero são obrigatórios', 400);
        }

        const checkauthorBookExist = await authorBookModel.getByTitle(title);

        if (!checkauthorBookExist) {
            return response.error('O livro já existe', 400);
        }

        await authorBookModel.create(title, synopsis, genre_id);

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

        const checkauthorBookExist = await authorBookModel.getById(id);

        if (!checkauthorBookExist) {
            return response.error(`Livro de id ${id} não encontrado`, 404);
        }
        
        await authorBookModel.update(id, title, synopsis);

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

        const checkauthorBookExist = await authorBookModel.getById(id);

        if (!checkauthorBookExist) {
            response.error(`Livro de id ${id} não encontrado`, 404);
        }

        await authorBookModel.exclude(id);

        return response.success('Livro foi excluído com sucesso', 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

module.exports = {
    getAll,
    getAllWithCompleteInfo,
    getById,
    create,
    update,
    exclude,
};