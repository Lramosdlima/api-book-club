const bookQuizService = require('../services/book_quiz');

class BookQuizController {
    async getAll(req, res) {
        const { codehttp, ...rest } = await bookQuizService.getAll();
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await bookQuizService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const { book_id, quiz_id, title, description  } = req.body;
        const { codehttp, ...rest } = await bookQuizService.create(book_id, quiz_id, title, description );
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { book_id, quiz_id, title, description } = req.body;
        const { codehttp, ...rest } = await bookQuizService.update(id, book_id, quiz_id, title, description );
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await bookQuizService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}

module.exports = {
    BookQuizController,
};