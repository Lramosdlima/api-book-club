const connection = require('/connection');

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

const create = async (title, synopsis) => {
    const book = await connection.execute(
        'INSERT INTO books (title,synopsis) VALUES (?, ?)',
        [title, synopsis],
    );
    return book;
};

const update = async (id, title, synopsis) => {
    const book = await connection.execute(
        'UPDATE books SET title = ?, synopsis = ? WHERE id = ?',
        [title, synopsis, id],
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
    create,
    update,
    exclude,
};