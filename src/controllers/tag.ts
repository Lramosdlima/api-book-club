import { TagService } from '../services/tag';

const tagService = new TagService();

export class TagController {
    async getAll(req, res) {
        const { page, limit } = req.query;
        const { codehttp, ...rest } = await tagService.getAll(page, limit);
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await tagService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const { name } = req.body;
        const { codehttp, ...rest } = await tagService.create(name);
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        const { codehttp, ...rest } = await tagService.update(id, name);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await tagService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}
