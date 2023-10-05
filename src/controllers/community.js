const communityModel = require('../models/community');

class CommunityController {
    async getAll(req, res) {
        const communities = await communityModel.getAll();
        return res.status(200).json(communities);
    }

    async getById(req, res) {
        const { id } = req.params;
        const community = await communityModel.getById(id);
        return res.status(200).json(community);
    }

    async create(req, res) {
        const { name, description } = req.body;
        const community = await communityModel.create(name, description);
        return res.status(201).json(community);
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, description } = req.body;
        const result = await communityModel.update(id, name, description);
        return res.status(200).json(result);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const result = await communityModel.exclude(id);
        return res.status(200).json(result);
    }
}

module.exports = {
    CommunityController,
};