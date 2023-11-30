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
        'SELECT * FROM user WHERE email = ?',
        [email],
    );
    return user[0];
};

const create = async (name, email, password, profile_picture) => {
    const user = await connection.execute(
        'INSERT INTO user (name, email, password, profile_picture) VALUES (?, ?, ?, ?)',
        [name, email,password,profile_picture],
    );
    return user;
};

const update = async (id, name, email, password, profile_picture) => {
    const user = await connection.execute(
        'UPDATE user SET name = ?, email = ?, password = ?, profile_picture = ?, WHERE id = ?',
        [name, email, id,password,profile_picture],
    );
    return user;
};

const exclude = async (id) => {
    const user = await connection.execute(
        'DELETE FROM user WHERE id = ?',
        [id],
    );
    return user;
};

module.exports = {
    getAll,
    getById,
    getByEmail,
    create,
    update,
    exclude,
};