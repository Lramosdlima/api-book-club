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

const create = async (name, author_id) => {
    const book = await connection.execute(
        'INSERT INTO books (name, author_id) VALUES (?, ?)',
        [name, author_id],
    );
    return book;
};

const update = async (id, name, author_id) => {
    const book = await connection.execute(
        'UPDATE books SET name = ?, author_id = ? WHERE id = ?',
        [name, author_id, id],
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