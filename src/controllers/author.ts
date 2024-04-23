import { AuthorService } from '../services/author';

const authorService = new AuthorService();

export class AuthorController {
    async getAll(req, res) {
        const { page, limit } = req.query;
        const { codehttp, ...rest } = await authorService.getAll(page, limit);
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await authorService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const { name, description, photo } = req.body;
        const { codehttp, ...rest } = await authorService.create(name, description, photo);
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, description, photo } = req.body;
        const { codehttp, ...rest } = await authorService.update(id, name, description, photo);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await authorService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}
