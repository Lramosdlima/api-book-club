const quizService = require('../services/quiz');

class QuizController {
    async getAll(req, res) {
        const { codehttp, ...rest } = await quizService.getAll();
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await quizService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const { question, alternative_id } = req.body;
        const { codehttp, ...rest } = await quizService.create(question, alternative_id);
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { question, alternative_id } = req.body;
        const { codehttp, ...rest } = await quizService.update(id, question, alternative_id);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await quizService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}

module.exports = {
    QuizController,
};