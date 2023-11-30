const connection = require('../config/connection');

const getAll = async () => {
    const authors = await connection.execute(
        'SELECT * FROM author',
    );
    return authors[0];
};

const getById = async (id) => {
    const author = await connection.execute(
        'SELECT * FROM author WHERE id = ?',
        [id],
    );
    return author[0];
};

const getByName = async (name) => {
    const author = await connection.execute(
        'SELECT * FROM author WHERE name = ?',
        [name],
    );
    return author[0];
};

const create = async (name, description) => {
    const author = await connection.execute(
        'INSERT INTO author (name, description) VALUES (?, ?)',
        [name, description],
    );
    return author[0];
};

const update = async (id, name, description) => {
    const author = await connection.execute(
        'UPDATE author SET name = ?, description = ? WHERE id = ?',
        [name, description, id],
    );
    return author[0];
};

const exclude = async (id) => {
    const author = await connection.execute(
        'DELETE FROM author WHERE id = ?',
        [id],
    );
    return author[0];
};

module.exports = {
    getAll,
    getById,
    getByName,
    create,
    update,
    exclude,
};