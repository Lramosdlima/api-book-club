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

const getByBookId = async (book_id) => {
    const authorBook = await connection.execute(
        'SELECT * FROM author_book WHERE book_id = ?',
        [book_id],
    );
    return authorBook[0];
};

const create = async (author_id, book_id) => {
    const authorBook = await connection.execute(
        'INSERT INTO author_book (author_id, book_id) VALUES (?, ?)',
        [author_id || null, book_id || null],
    );
    return authorBook[0];
};

const update = async (id, author_id, book_id) => {
    const authorBook = await connection.execute(
        'UPDATE author_book SET author_id = ?, book_id = ? WHERE id = ?',
        [author_id, book_id, id],
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
    getByBookId,
    create,
    update,
    exclude,
};