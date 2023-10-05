const communityChatService = require('../services/community_chat');

class CommunityChatController {
    async getAll(req, res) {
        const { codehttp, ...rest } = await communityChatService.getAll();
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await communityChatService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const { community_user_id, message } = req.body;
        const { codehttp, ...rest } = await communityChatService.create(community_user_id, message);
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { community_user_id, message } = req.body;
        const { codehttp, ...rest } = await communityChatService.update(id, community_user_id, message);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await communityChatService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}

module.exports = {
    CommunityChatController,
};