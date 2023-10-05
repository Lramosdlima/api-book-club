const connection = require('/connection');

const getAll = async () => {
    const community_chats = await connection.execute(
        'SELECT * FROM community_chat',
    );
    return community_chats;
};

const getById = async (id) => {
    const community_chat = await connection.execute(
        'SELECT * FROM community_chat WHERE id = ?',
        [id],
    );
    return community_chat;
};

const create = async (community_user_id, message) => {
    const community_chat = await connection.execute(
        'INSERT INTO community_chat (community_user_id,message) VALUES (?, ?)',
        [community_user_id, message],
    );
    return community_chat;
};

const update = async (id, community_user_id, message) => {
    const community_chat = await connection.execute(
        'UPDATE community_chat SET community_user_id = ?, message = ? WHERE id = ?',
        [community_user_id, message, id],
    );
    return community_chat;
};

const exclude = async (id) => {
    const community_chat = await connection.execute(
        'DELETE FROM community_chat WHERE id = ?',
        [id],
    );
    return community_chat;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    exclude,
};