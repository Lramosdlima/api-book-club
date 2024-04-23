import { UserBookRateService } from '../services/user_book_rate';

const userBookRateService = new UserBookRateService();

export class UserBookRateController {
    async getAll(req, res) {
        const { page, limit } = req.query;
        const { codehttp, ...rest } = await userBookRateService.getAll(page, limit);
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await userBookRateService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async getAllByBookId(req, res) {
        const { book_id } = req.params;
        const { codehttp, ...rest } = await userBookRateService.getAllByBookId(book_id);
        return res.status(codehttp).json(rest);
    }

    async getAllByUserId(req, res) {
        const { user_id } = req.params;
        const { codehttp, ...rest } = await userBookRateService.getAllByUserId(user_id);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const { user_id, book_id, rate, comment } = req.body;
        const { codehttp, ...rest } = await userBookRateService.create({ user_id, book_id, rate, comment });
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { rate, comment } = req.body;
        const { codehttp, ...rest } = await userBookRateService.update(id, { rate, comment });
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await userBookRateService.exclude(id);
        return res.status(codehttp).json(rest);
    }
    
}
