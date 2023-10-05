const bookModel = require('../models/book');

class BookController {
    async getAll(req, res) {
        const books = await bookModel.getAll();
        return res.status(200).json(books);
    }

    async getById(req, res) {
        const { id } = req.params;
        const book = await bookModel.getById(id);
        return res.status(200).json(book);
    }

    async create(req, res) {
        const { title, synopsis, genre_id } = req.body;
        const book = await bookModel.create(title, synopsis, genre_id);
        return res.status(201).json(book);
    }

    async update(req, res) {
        const { id } = req.params;
        const { title, synopsis, genre_id } = req.body;
        const result = await bookModel.update(id, title, synopsis, genre_id);
        return res.status(200).json(result);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const result = await bookModel.exclude(id);
        return res.status(200).json(result);
    }
}

module.exports = {
    BookController,
};