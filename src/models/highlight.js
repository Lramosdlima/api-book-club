const connection = require('../config/connection');

const getAll = async () => {
    const highlights = await connection.execute(
        'SELECT * FROM highlight',
    );
    return highlights[0];
};

const getById = async (id) => {
    const highlight = await connection.execute(
        'SELECT * FROM highlight WHERE id = ?',
        [id],
    );
    return highlight[0];
};

const getByName = async (name) => {
    const highlight = await connection.execute(
        'SELECT * FROM highlight WHERE name = ?',
        [name],
    );
    return highlight;
};

const create = async (name, description) => {
    const highlight = await connection.execute(
        'INSERT INTO highlight (name, description) VALUES (?, ?)',
        [name, description],
    );
    return highlight[0];
};

const update = async (id, name, description) => {
    const highlight = await connection.execute(
        'UPDATE highlight SET name = ?, description = ? WHERE id = ?',
        [name, description, id],
    );
    return highlight[0];
};

const exclude = async (id) => {
    const highlight = await connection.execute(
        'DELETE FROM highlight WHERE id = ?',
        [id],
    );
    return highlight[0];
};

module.exports = {
    getAll,
    getById,
    getByName,
    create,
    update,
    exclude,
};