const communityUserService = require('../services/communityUser');

class CommunityUserController {
    async getAll(req, res) {
        const { codehttp, ...rest } = await communityUserService.getAll();
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await communityUserService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const { userId } = req;
        const { community_id } = req.body;
        const { codehttp, ...rest } = await communityUserService.create(community_id, userId);
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { userId } = req;
        const { community_id } = req.body;
        const { codehttp, ...rest } = await communityUserService.update(id, community_id, userId);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await communityUserService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}

module.exports = {
    CommunityUserController,
};