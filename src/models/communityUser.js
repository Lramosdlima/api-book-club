const connection = require('../config/connection');

const getAll = async () => {
    const communityUsers = await connection.execute(
        'SELECT * FROM community_user',
    );
    return communityUsers[0];
};

const getById = async (id) => {
    const communityUser = await connection.execute(
        'SELECT * FROM community_user WHERE id = ?',
        [id],
    );
    return communityUser[0];
};

const create = async (name, description) => {
    const communityUser = await connection.execute(
        'INSERT INTO community_user (name, description) VALUES (?, ?)',
        [name, description],
    );
    return communityUser[0];
};

const update = async (id, name, description) => {
    const communityUser = await connection.execute(
        'UPDATE community_user SET name = ?, description = ? WHERE id = ?',
        [name, description, id],
    );
    return communityUser[0];
};

const exclude = async (id) => {
    const communityUser = await connection.execute(
        'DELETE FROM community_user WHERE id = ?',
        [id],
    );
    return communityUser[0];
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    exclude,
};