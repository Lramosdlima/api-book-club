const communityService = require('../services/community');

class CommunityController {
    async getAll(req, res) {
        const { codehttp, ...rest } = await communityService.getAll();
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await communityService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const { name, description } = req.body;
        const { codehttp, ...rest } = await communityService.create(name, description);
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, description } = req.body;
        const { codehttp, ...rest } = await communityService.update(id, name, description);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await communityService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}

module.exports = {
    CommunityController,
};