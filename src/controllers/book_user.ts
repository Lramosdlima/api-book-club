import { BookUserService } from '../services/book_user';

const bookUserService = new BookUserService();

export class BookUserController {
    async getAllInteractionsByBookId(req, res) {
        const { book_id } = req.params;
        const { page, limit } = req.query;
        const { codehttp, ...rest } = await bookUserService.getAllInteractionsByBookId(book_id, page, limit);
        return res.status(codehttp).json(rest);
    }

    async getAllInteractionsByUserId(req, res) {
        const { user_id } = req.params;
        const { codehttp, ...rest } = await bookUserService.getAllInteractionsByUserId(user_id);
        return res.status(codehttp).json(rest);
    }

    async add(req, res) {
        const { user_id, book_id, already_read, want_to_read, liked } = req.body;
        const { codehttp, ...rest } = await bookUserService.add({ user_id, book_id, already_read, want_to_read, liked });
        return res.status(codehttp).json(rest);
    }

    async update(req, res) {
        const { id } = req.params;
        const { already_read, want_to_read, liked } = req.body;
        const { codehttp, ...rest } = await bookUserService.update(id, { already_read, want_to_read, liked });
        return res.status(codehttp).json(rest);
    }
}
