const connection = require('../config/connection');

const getAll = async () => {
    const users = await connection.execute(
        'SELECT * FROM user',
    );
    return users;
};

const getById = async (id) => {
    const user = await connection.execute(
        'SELECT * FROM user WHERE id = ?',
        [id],
    );
    return user;
};

const create = async (name, email,password,profile_picture) => {
    const user = await connection.execute(
        'INSERT INTO user (name,email,password,profile_picture) VALUES (?,?,?,?)',
        [name, email,password,profile_picture],
    );
    return user;
};

const update = async (id, name, email,password,profile_picture) => {
    const user = await connection.execute(
        'UPDATE user SET name = ?, email = ? , password = ?, profile_picture = ?, WHERE id = ?',
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
    create,
    update,
    exclude,
};