const connection = require('/connection');

const getAll = async () => {
    const authors = await connection.execute(
        'SELECT * FROM author',
    );
    return authors;
};

const getById = async (id) => {
    const author = await connection.execute(
        'SELECT * FROM author WHERE id = ?',
        [id],
    );
    return author;
};

const create = async (name, discription) => {
    const author = await connection.execute(
        'INSERT INTO author (name,discription) VALUES (?, ?)',
        [name, discription],
    );
    return author;
};

const update = async (id, name, discription) => {
    const author = await connection.execute(
        'UPDATE author SET name = ?, discription = ? WHERE id = ?',
        [name, discription, id],
    );
    return author;
};

const exclude = async (id) => {
    const author = await connection.execute(
        'DELETE FROM author WHERE id = ?',
        [id],
    );
    return author;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    exclude,
};