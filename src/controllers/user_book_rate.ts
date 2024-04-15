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

    async getByBookId(req, res) {
        const { book_id } = req.params;
        const { codehttp, ...rest } = await userBookRateService.getById(book_id);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const { rate } = req.body;
        const { codehttp, ...rest } = await userBookRateService.create(rate);
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { rate } = req.body;
        const { codehttp, ...rest } = await userBookRateService.update(id, rate);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await userBookRateService.exclude(id);
        return res.status(codehttp).json(rest);
    }
    
}
