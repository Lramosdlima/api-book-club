const connection = require('../config/connection');

const getAll = async () => {
    const users = await connection.execute(
        'SELECT * FROM user',
    );
    return users[0];
};

const getById = async (id) => {
    const user = await connection.execute(
        'SELECT * FROM user WHERE id = ?',
        [id],
    );
    return user[0];
};

const getByEmail = async (email) => {
    const user = await connection.execute(
        'SELECT * FROM user WHERE email = ? LIMIT 1',
        [email],
    );
    return user[0];
};

const create = async (name, email, password) => {
    const user = await connection.execute(
        'INSERT INTO user (name, email, password) VALUES (?, ?, ?)',
        [name, email, password],
    );
    return user[0];
};

const update = async (id, name, email) => {
    const user = await connection.execute(
        'UPDATE user SET name = ?, email = ? WHERE id = ?',
        [name, email, id],
    );
    return user[0];
};

const updatePassword = async (id, password) => {
    const user = await connection.execute(
        'UPDATE user SET password = ? WHERE id = ?',
        [password, id],
    );
    return user[0];
};

const exclude = async (id) => {
    const user = await connection.execute(
        'DELETE FROM user WHERE id = ?',
        [id],
    );
    return user[0];
};

module.exports = {
    getAll,
    getById,
    getByEmail,
    create,
    update,
    updatePassword,
    exclude,
};