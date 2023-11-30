const connection = require('../config/connection');

const getAll = async () => {
    const communitys = await connection.execute(
        'SELECT * FROM community',
    );
    return communitys[0];
};

const getById = async (id) => {
    const community = await connection.execute(
        'SELECT * FROM community WHERE id = ?',
        [id],
    );
    return community[0];
};

const create = async (name, description) => {
    const community = await connection.execute(
        'INSERT INTO community (name, description) VALUES (?, ?)',
        [name, description],
    );
    return community[0];
};

const update = async (id, name, description) => {
    const community = await connection.execute(
        'UPDATE community SET name = ?, description = ? WHERE id = ?',
        [name, description, id],
    );
    return community[0];
};

const exclude = async (id) => {
    const community = await connection.execute(
        'DELETE FROM community WHERE id = ?',
        [id],
    );
    return community[0];
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    exclude,
};