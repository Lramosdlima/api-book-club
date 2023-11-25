const roleService = require('../services/role');

class roleController {
    async getAll(req, res) {
        const { codehttp, ...rest } = await roleService.getAll();
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await roleService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const { type} = req.body;
        const { codehttp, ...rest } = await roleService.create(type);
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { type } = req.body;
        const { codehttp, ...rest } = await roleService.update(id, type);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await roleService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}

module.exports = {
    roleController,
};