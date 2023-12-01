const connection = require('../config/connection');

const getAll = async () => {
    const quizzes = await connection.execute(
        'SELECT * FROM quiz',
    );
    return quizzes[0];
};

const getById = async (id) => {
    const quiz = await connection.execute(
        'SELECT * FROM quiz WHERE id = ?',
        [id],
    );
    return quiz[0];
};

const create = async (name, description) => {
    const quiz = await connection.execute(
        'INSERT INTO quiz (name, description) VALUES (?, ?)',
        [name, description],
    );
    return quiz[0];
};

const update = async (id, name, description) => {
    const quiz = await connection.execute(
        'UPDATE quiz SET name = ?, description = ? WHERE id = ?',
        [name, description, id],
    );
    return quiz[0];
};

const exclude = async (id) => {
    const quiz = await connection.execute(
        'DELETE FROM quiz WHERE id = ?',
        [id],
    );
    return quiz[0];
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    exclude,
};