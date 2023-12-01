const quizModel = require('../models/quiz');
const genreModel = require('../models/genre');
const ResponseOn = require('../config/utils/response');

const response = new ResponseOn();

const getAll = async () => {
    try {
        const quizzes = await quizModel.getAll();

        if (quizzes.length === 0 || !quizzes) {
            return response.error('Nenhum livro encontrado', 404);
        }

        return response.success(quizzes, 200);

    } catch (error) {
        return response.error(error, 500);
    }
};

const getAllWithCompleteInfo = async () => {
    try {
        const quizzes = await quizModel.getAll();

        if (quizzes.length === 0 || !quizzes) {
            return response.error('Nenhum livro encontrado', 404);
        }

        for (let i = 0; i < quizzes.length; i++) {
            const genre = await genreModel.getById(quizzes[i].genre_id);
            quizzes[i].genre = genre[0].name;
        }

        const finalResponse = quizzes.map((quiz) => {
            return {
                title: quiz.title,
                synopsis: quiz.synopsis,
                genre: quiz.genre,
                imageUrl: quiz.urlImage,
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

        const quiz = await quizModel.getById(id);

        if (!quiz) {
            return response.error(`Livro de id ${id} não encontrado`, 404);
        }

        return response.success(quiz, 200);
    } catch (error) {
        return response.error(error, 500);
    }
};

const create = async (title, synopsis, genre_id) => {
    try {
        if (!title || !synopsis || !genre_id) {
            return response.error('O nome, descrição e o id do gênero são obrigatórios', 400);
        }

        const checkquizExist = await quizModel.getByTitle(title);

        if (!checkquizExist) {
            return response.error('O livro já existe', 400);
        }

        await quizModel.create(title, synopsis, genre_id);

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

        const checkquizExist = await quizModel.getById(id);

        if (!checkquizExist) {
            return response.error(`Livro de id ${id} não encontrado`, 404);
        }
        
        await quizModel.update(id, title, synopsis);

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

        const checkquizExist = await quizModel.getById(id);

        if (!checkquizExist) {
            response.error(`Livro de id ${id} não encontrado`, 404);
        }

        await quizModel.exclude(id);

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