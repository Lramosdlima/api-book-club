const connection = require('../config/connection');

const getAll = async () => {
    const books = await connection.execute(
        'SELECT * FROM books',
    );
    return books;
};

const getById = async (id) => {
    const book = await connection.execute(
        'SELECT * FROM books WHERE id = ?',
        [id],
    );
    return book;
};

const getByTitle = async (title) => {
    const book = await connection.execute(
        'SELECT * FROM books WHERE title = ?',
        [title],
    );
    return book;
};

const create = async (title, synopsis, genre_id) => {
    const book = await connection.execute(
        'INSERT INTO books (title,synopsis,genre_id) VALUES (?, ?,?)',
        [title, synopsis,genre_id],
    );
    return book;
};

const update = async (id, title, synopsis,genre_id) => {
    const book = await connection.execute(
        'UPDATE books SET title = ?, synopsis = ?,genre_id = ? WHERE id = ?',
        [title, synopsis, id,genre_id],
    );
    return book;
};

const exclude = async (id) => {
    const book = await connection.execute(
        'DELETE FROM books WHERE id = ?',
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