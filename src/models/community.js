const connection = require('../config/connection');

const getAll = async () => {
    const communitys = await connection.execute(
        'SELECT * FROM community',
    );
    return communitys;
};

const getById = async (id) => {
    const community = await connection.execute(
        'SELECT * FROM community WHERE id = ?',
        [id],
    );
    return community;
};

const create = async (name, description) => {
    const community = await connection.execute(
        'INSERT INTO community (name,description) VALUES (?, ?)',
        [name, description],
    );
    return community;
};

const update = async (id, name, description) => {
    const community = await connection.execute(
        'UPDATE community SET name = ?, description = ? WHERE id = ?',
        [name, description, id],
    );
    return community;
};

const exclude = async (id) => {
    const community = await connection.execute(
        'DELETE FROM community WHERE id = ?',
        [id],
    );
    return community;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    exclude,
};