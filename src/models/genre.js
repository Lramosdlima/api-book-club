const connection = require('/connection');

const getAll = async () => {
    const genres = await connection.execute(
        'SELECT * FROM genre',
    );
    return genres;
};

const getById = async (id) => {
    const genre = await connection.execute(
        'SELECT * FROM genre WHERE id = ?',
        [id],
    );
    return genre;
};

const create = async (name, description) => {
    const genre = await connection.execute(
        'INSERT INTO genre (name,description) VALUES (?, ?)',
        [name, description],
    );
    return genre;
};

const update = async (id, name, description) => {
    const genre = await connection.execute(
        'UPDATE genre SET name = ?, description = ? WHERE id = ?',
        [name, description, id],
    );
    return genre;
};

const exclude = async (id) => {
    const genre = await connection.execute(
        'DELETE FROM genre WHERE id = ?',
        [id],
    );
    return genre;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    exclude,
};