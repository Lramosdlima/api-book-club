const connection = require('../config/connection');

const getAll = async () => {
    const authorBooks = await connection.execute(
        'SELECT * FROM author_book',
    );
    return authorBooks[0];
};

const getById = async (id) => {
    const authorBook = await connection.execute(
        'SELECT * FROM author_book WHERE id = ?',
        [id],
    );
    return authorBook[0];
};

const create = async (name, description) => {
    const authorBook = await connection.execute(
        'INSERT INTO author_book (name, description) VALUES (?, ?)',
        [name, description],
    );
    return authorBook[0];
};

const update = async (id, name, description) => {
    const authorBook = await connection.execute(
        'UPDATE author_book SET name = ?, description = ? WHERE id = ?',
        [name, description, id],
    );
    return authorBook[0];
};

const exclude = async (id) => {
    const authorBook = await connection.execute(
        'DELETE FROM author_book WHERE id = ?',
        [id],
    );
    return authorBook[0];
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    exclude,
};