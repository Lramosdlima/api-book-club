const author_bookService = require('../services/author_book');

class author_bookController {
    async getAll(req, res) {
        const { codehttp, ...rest } = await author_bookService.getAll();
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await author_bookService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const { book_id, author_id } = req.body;
        const { codehttp, ...rest } = await author_bookService.create(book_id, author_id );
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { book_id, author_id } = req.body;
        const { codehttp, ...rest } = await author_bookService.update(id, book_id, author_id);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await author_bookService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}

module.exports = {
    author_bookController,
};