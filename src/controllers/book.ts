import { BookService } from '../services/book';

const bookService = new BookService();

export class BookController {
    async getAll(req, res) {
        const { page, limit } = req.query;
        const { codehttp, ...rest } = await bookService.getAll(page, limit);
        return res.status(codehttp).json(rest);
    }

    async getAllWithCompleteInfo(req, res) {
        const { page, limit } = req.query;
        const { codehttp, ...rest } = await bookService.getAllWithCompleteInfo(page, limit);
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await bookService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async createWithAuthorExist(req, res) {
        const { title, synopsis, urlImage, genre_id, author_id } = req.body;
        const { codehttp, ...rest } = await bookService.createWithAuthorExist(title, synopsis, urlImage, genre_id, author_id);
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { title, synopsis, urlImage, genre_id, author_id } = req.body;
        const { codehttp, ...rest } = await bookService.update(id, title, synopsis, urlImage, genre_id, author_id);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await bookService.exclude(id);
        return res.status(codehttp).json(rest);
    }

    async createWithCompleteInfo(req, res) {
        const { title, synopsis, urlImage, genre_id, authorName } = req.body;
        const { codehttp, ...rest } = await bookService.createWithCompleteInfo(title, synopsis, urlImage, genre_id, authorName);
        return res.status(codehttp).json(rest);
    }

    async getByTitle(req, res) {
        const { title } = req.query;
        const { codehttp, ...rest } = await bookService.getByTitle(title);
        return res.status(codehttp).json(rest);
    }

}
