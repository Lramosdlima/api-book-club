const connection = require('../config/connection');

const getAll = async () => {
    const roles = await connection.execute(
        'SELECT * FROM role',
    );
    return roles[0];
};

const getById = async (id) => {
    const role = await connection.execute(
        'SELECT * FROM role WHERE id = ?',
        [id],
    );
    return role[0];
};

const getByName = async (name) => {
    const role = await connection.execute(
        'SELECT * FROM role WHERE name = ?',
        [name],
    );
    return role;
};

const create = async (name, description) => {
    const role = await connection.execute(
        'INSERT INTO role (name, description) VALUES (?, ?)',
        [name, description],
    );
    return role[0];
};

const update = async (id, name, description) => {
    const role = await connection.execute(
        'UPDATE role SET name = ?, description = ? WHERE id = ?',
        [name, description, id],
    );
    return role[0];
};

const exclude = async (id) => {
    const role = await connection.execute(
        'DELETE FROM role WHERE id = ?',
        [id],
    );
    return role[0];
};

module.exports = {
    getAll,
    getById,
    getByName,
    create,
    update,
    exclude,
};