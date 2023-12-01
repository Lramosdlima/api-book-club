const bookChallengeService = require('../services/bookChallenge');

class BookChallengeController {
    async getAll(req, res) {
        const { codehttp, ...rest } = await bookChallengeService.getAll();
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await bookChallengeService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const { name, email, password, profile_picture } = req.body;
        const { codehttp, ...rest } = await bookChallengeService.create(name, email, password, profile_picture);
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, email, password, profile_picture } = req.body;
        const { codehttp, ...rest } = await bookChallengeService.update(id, name, email, password, profile_picture);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await bookChallengeService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}

module.exports = {
    BookChallengeController,
};