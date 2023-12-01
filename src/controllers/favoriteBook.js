const favoriteBookService = require('../services/favoriteBook');

class FavoriteBookController {
    async getAllByUser(req, res) {
        const { user_id } = req.body;
        const { codehttp, ...rest } = await favoriteBookService.getAllByUser(user_id);
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await favoriteBookService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const { user_id, book_id } = req.body;
        const { codehttp, ...rest } = await favoriteBookService.create(user_id, book_id);
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { book_id, user_id } = req.body;
        const { codehttp, ...rest } = await favoriteBookService.update(id, user_id, book_id);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await favoriteBookService.exclude(id);
        return res.status(codehttp).json(rest);
    }
}

module.exports = {
    FavoriteBookController,
};