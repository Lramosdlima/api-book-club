const connection = require('../config/connection');

const getAll = async () => {
    const communityChats = await connection.execute(
        'SELECT * FROM community_chat',
    );
    return communityChats;
};

const getById = async (id) => {
    const communityChat = await connection.execute(
        'SELECT * FROM community_chat WHERE id = ?',
        [id],
    );
    return communityChat;
};

const create = async (community_user_id, message) => {
    const communityChat = await connection.execute(
        'INSERT INTO community_chat (community_user_id,message) VALUES (?, ?)',
        [community_user_id, message],
    );
    return communityChat;
};

const update = async (id, community_user_id, message) => {
    const communityChat = await connection.execute(
        'UPDATE community_chat SET community_user_id = ?, message = ? WHERE id = ?',
        [community_user_id, message, id],
    );
    return communityChat;
};

const exclude = async (id) => {
    const communityChat = await connection.execute(
        'DELETE FROM community_chat WHERE id = ?',
        [id],
    );
    return communityChat;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    exclude,
};