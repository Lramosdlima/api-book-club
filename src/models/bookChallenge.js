const connection = require('../config/connection');

const getAll = async () => {
    const bookChallenges = await connection.execute(
        'SELECT * FROM book_challenge',
    );
    return bookChallenges[0];
};

const getById = async (id) => {
    const bookChallenge = await connection.execute(
        'SELECT * FROM book_challenge WHERE id = ?',
        [id],
    );
    return bookChallenge[0];
};

const getByEmail = async (email) => {
    const bookChallenge = await connection.execute(
        'SELECT * FROM book_challenge WHERE email = ?',
        [email],
    );
    return bookChallenge[0];
};

const create = async (name, email, password, profile_picture) => {
    const bookChallenge = await connection.execute(
        'INSERT INTO book_challenge (name, email, password, profile_picture) VALUES (?, ?, ?, ?)',
        [name, email,password,profile_picture],
    );
    return bookChallenge;
};

const update = async (id, name, email, password, profile_picture) => {
    const bookChallenge = await connection.execute(
        'UPDATE book_challenge SET name = ?, email = ?, password = ?, profile_picture = ?, WHERE id = ?',
        [name, email, id,password,profile_picture],
    );
    return bookChallenge;
};

const exclude = async (id) => {
    const bookChallenge = await connection.execute(
        'DELETE FROM book_challenge WHERE id = ?',
        [id],
    );
    return bookChallenge;
};

module.exports = {
    getAll,
    getById,
    getByEmail,
    create,
    update,
    exclude,
};