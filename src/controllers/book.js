const bookService = require('../services/book');

class BookController {
    async getAll(req, res) {
        const books = await bookService.getAll();
        return res.status(200).json(books);
    }

    async getById(req, res) {
        const { id } = req.params;
        const book = await bookService.getById(id);
        return res.status(200).json(book);
    }

    async create(req, res) {
        const { title, synopsis, genre_id } = req.body;
        const book = await bookService.create(title, synopsis, genre_id);
        return res.status(201).json(book);
    }

    async update(req, res) {
        const { id } = req.params;
        const { title, synopsis, genre_id } = req.body;
        const result = await bookService.update(id, title, synopsis, genre_id);
        return res.status(200).json(result);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const result = await bookService.exclude(id);
        return res.status(200).json(result);
    }
}

module.exports = {
    BookController,
};