import { CollectionService } from '../services/collection';

const collectionService = new CollectionService();

export class CollectionController {
    async getAll(req, res) {
        const { page, limit } = req.query;
        const { codehttp, ...rest } = await collectionService.getAll(page, limit);
        return res.status(codehttp).json(rest);
    }

    async getById(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await collectionService.getById(id);
        return res.status(codehttp).json(rest);
    }

    async getAllByOwnerId(req, res) {
        const { owner_id } = req.params;
        const { codehttp, ...rest } = await collectionService.getAllByOwnerId(owner_id);
        return res.status(codehttp).json(rest);
    }

    async create(req, res) {
        const { title, description, owner_id, books } = req.body;
        const { codehttp, ...rest } = await collectionService.create(title, description, owner_id, books);
        return res.status(codehttp).json(rest);
    }

    async addCollectionToUser(req, res) {
        const { user_id, collection_id } = req.body;
        const { codehttp, ...rest } = await collectionService.addCollectionToUser(user_id, collection_id);
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { title, description } = req.body;
        const { codehttp, ...rest } = await collectionService.update(id, title, description);
        return res.status(codehttp).json(rest);
    }

    async addBookToCollection(req, res) {
        const { id } = req.params;
        const { bookId } = req.body;
        const { codehttp, ...rest } = await collectionService.addBookToCollection(id, bookId);
        return res.status(codehttp).json(rest);
    }

    async exclude(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await collectionService.exclude(id);
        return res.status(codehttp).json(rest);
    }

    async removeCollectionFromUser(req, res) {
        const { id } = req.params;
        const { codehttp, ...rest } = await collectionService.removeCollectionFromUser(id);
        return res.status(codehttp).json(rest);
    }
}
