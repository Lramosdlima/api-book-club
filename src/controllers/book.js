class BookController {
    async getAll(req, res) {
        const books = [
            { name: 'The Lord of the Rings', author: 'J.R.R. Tolkien' },
            { name: 'Harry Potter and the Goblet of Fire', author: 'J.K. Rowling' },
        ];
        return res.status(200).json(books);
    }
}

module.exports = {
    BookController,
};