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
    return book[0];
};

const getByTitle = async (title) => {
    const book = await connection.execute(
        'SELECT * FROM book WHERE title LIKE \'%?%\'',
        [title],
    );
    return book[0];
};

const create = async (title, synopsis, genre_id) => {
    const book = await connection.execute(
        'INSERT INTO book (title, synopsis, genre_id) VALUES (?, ?, ?)',
        [title || null, synopsis || null, genre_id || null],
    );
    return book[0];
};

const update = async (id, title, synopsis,genre_id) => {
    const book = await connection.execute(
        'UPDATE book SET title = ?, synopsis = ?, genre_id = ? WHERE id = ?',
        [title, synopsis, id,genre_id],
    );
    return book[0];
};

const exclude = async (id) => {
    const book = await connection.execute(
        'DELETE FROM book WHERE id = ?',
        [id],
    );
    return book[0];
};

module.exports = {
    getAll,
    getById,
    getByTitle,
    create,
    update,
    exclude,
};