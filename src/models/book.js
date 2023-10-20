const connection = require('../config/connection');

const getAll = async () => {
    const books = await connection.execute(
        'SELECT * FROM book',
    );
    return books[0];
};

const getById = async (id) => {
    const book = await connection.execute(
        'SELECT * FROM book WHERE id = ?',
        [id],
    );
    return book;
};

const getByTitle = async (title) => {
    const book = await connection.execute(
        'SELECT * FROM book WHERE title = ?',
        [title],
    );
    return book;
};

const create = async (title, synopsis, genre_id) => {
    const book = await connection.execute(
        'INSERT INTO book (title, synopsis, genre_id) VALUES (?, ?, ?)',
        [title || null, synopsis || null, genre_id || null],
    );
    return book;
};

const update = async (id, title, synopsis,genre_id) => {
    const book = await connection.execute(
        'UPDATE book SET title = ?, synopsis = ?,genre_id = ? WHERE id = ?',
        [title, synopsis, id,genre_id],
    );
    return book;
};

const exclude = async (id) => {
    const book = await connection.execute(
        'DELETE FROM book WHERE id = ?',
        [id],
    );
    return book;
};

module.exports = {
    getAll,
    getById,
    getByTitle,
    create,
    update,
    exclude,
};