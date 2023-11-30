const bookService = require('../services/book');

class BookController {
    async getAll(req, res) {
        const { codehttp, ...rest } = await bookService.getAll();
        return res.status(codehttp).json(rest);
    }

    async getAllWithCompleteInfo(req, res) {
        const { codehttp, ...rest } = await bookService.getAllWithCompleteInfo();
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await bookService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const { title, synopsis, genre_id } = req.body;
        const { codehttp, ...rest } = await bookService.create(title, synopsis, genre_id);
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { title, synopsis, genre_id } = req.body;
        const { codehttp, ...rest } = await bookService.update(id, title, synopsis, genre_id);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await bookService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}

module.exports = {
    BookController,
};