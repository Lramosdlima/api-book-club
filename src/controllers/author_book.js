const authorBookService = require('../services/author_book');

class AuthorBookController {
    async getAll(req, res) {
        const { codehttp, ...rest } = await authorBookService.getAll();
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await authorBookService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const { book_id, author_id } = req.body;
        const { codehttp, ...rest } = await authorBookService.create(book_id, author_id );
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { book_id, author_id } = req.body;
        const { codehttp, ...rest } = await authorBookService.update(id, book_id, author_id);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await authorBookService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}

module.exports = {
    AuthorBookController,
};