const connection = require('../config/connection');

const getAllByUser = async (user_id) => {
    const favoriteBooks = await connection.execute(
        'SELECT * FROM favorite_book WHERE user_id = ?',
        [user_id],
    );
    return favoriteBooks[0];
};

const getByUserAndBook = async (user_id, book_id) => {
    const book = await connection.execute(
        'SELECT * FROM favorite_book WHERE  user_id = ? AND book_id = ?',
        [user_id, book_id],
    );
    return book[0];
};

const getById = async (id) => {
    const favoriteBook = await connection.execute(
        'SELECT * FROM favorite_book WHERE id = ?',
        [id],
    );
    return favoriteBook[0];
};

const create = async (user_id, book_id) => {
    const favoriteBook = await connection.execute(
        'INSERT INTO favorite_book (user_id, book_id) VALUES (?, ?)',
        [user_id, book_id],
    );
    return favoriteBook[0];
};

const update = async (id, user_id, book_id) => {
    const favoriteBook = await connection.execute(
        'UPDATE favorite_book SET user_id = ?, book_id = ? WHERE id = ?',
        [user_id, book_id, id],
    );
    return favoriteBook[0];
};

const exclude = async (id) => {
    const favoriteBook = await connection.execute(
        'DELETE FROM favorite_book WHERE id = ?',
        [id],
    );
    return favoriteBook[0];
};

module.exports = {
    getAllByUser,
    getByUserAndBook,
    getById,
    create,
    update,
    exclude,
};