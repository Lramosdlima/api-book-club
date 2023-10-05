const authorModel = require('../models/author');

class AuthorController {
    async getAll(req, res) {
        const authors = await authorModel.getAll();
        return res.status(200).json(authors);
    }

    async getById(req, res) {
        const { id } = req.params;
        const author = await authorModel.getById(id);
        return res.status(200).json(author);
    }

    async create(req, res) {
        const { title, synopsis, genre_id } = req.body;
        const author = await authorModel.create(title, synopsis, genre_id);
        return res.status(201).json(author);
    }

    async update(req, res) {
        const { id } = req.params;
        const { title, synopsis, genre_id } = req.body;
        const result = await authorModel.update(id, title, synopsis, genre_id);
        return res.status(200).json(result);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const result = await authorModel.exclude(id);
        return res.status(200).json(result);
    }
}

module.exports = {
    AuthorController,
};