const book_quizService = require('../services/book_quiz');

class book_quizController {
    async getAll(req, res) {
        const { codehttp, ...rest } = await book_quizService.getAll();
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await book_quizService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const { book_id, quiz_id,title,description  } = req.body;
        const { codehttp, ...rest } = await book_quizService.create(book_id, quiz_id,title,description );
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { book_id, quiz_id,title,description } = req.body;
        const { codehttp, ...rest } = await book_quizService.update(id, book_id, quiz_id,title,description );
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await book_quizService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}

module.exports = {
    book_quizController,
};