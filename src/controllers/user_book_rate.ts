import { UserBookRateService } from '../services/user_book_rate';

const UserBookRateService = new UserBookRateService();

export class UserBookRateController {
    async getAll(req, res) {
        const { page, limit } = req.query;
        const { codehttp, ...rest } = await UserBookRateService.getAll(page, limit);
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await UserBookRateService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const { name } = req.body;
        const { codehttp, ...rest } = await UserBookRateService.create(name);
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        const { codehttp, ...rest } = await UserBookRateService.update(id, name);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await UserBookRateService.exclude(id);
        return res.status(codehttp).json(rest);
    }
    
}
