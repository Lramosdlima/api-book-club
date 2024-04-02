import { ResponseOn } from '../config/utils/response';
import { BookEntity } from '../entities/book';
import { AuthorRepository } from '../repositories/author';
import { BookRepository } from '../repositories/book';
import { GenreRepository } from '../repositories/genre';
import { HttpStatus } from '../types/http_status_type';

const response = new ResponseOn();
const bookRepository = new BookRepository();
const genreRepository = new GenreRepository();
const authorRepository = new AuthorRepository();

async function getBookInfo(books: BookEntity[]) {
    for (let i = 0; i < books.length; i++) {
        const genre = await genreRepository.getById(books[i].genre_id);
        books[i].genre = genre;
        const authorBook = await authorRepository.getById(books[i].id);
        books[i].author = authorBook;
    }

    return books.map((book) => {
        return {
            id: book.id,
            title: book.title,
            synopsis: book.synopsis,
            genre: book.genre,
            imageUrl: book.url_image,
            author: book.author,
        };
    });
}

export class BookService {
    getAll = async (page?: number, limit?: number) => {
        try {
            const books = await bookRepository.getAll(page, limit);

            if (books.length === 0 || !books) {
                return response.error('Nenhum livro encontrado', HttpStatus.NOT_FOUND);
            }

            return response.success(books, HttpStatus.OK);

        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    getAllWithCompleteInfo = async (page?: number, limit?: number) => {
        try {
            const books = await bookRepository.getAll(page, limit);

            if (books.length === 0 || !books) {
                return response.error('Nenhum livro encontrado', HttpStatus.NOT_FOUND);
            }

            const filterBooks = await getBookInfo(books);

            return response.success(filterBooks, HttpStatus.OK);

        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    getById = async (id: number) => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', HttpStatus.BAD_REQUEST);
            }

            const book = await bookRepository.getById(id);

            if (!book) {
                return response.error(`Livro de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            return response.success(book, HttpStatus.OK);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    createWithAuthorExist = async (title: string, synopsis: string, url_image: string, genre_id: number, author_id: number) => {
        try {
            if (!title || !genre_id) {
                return response.error('O nome e o id do gênero são obrigatórios', HttpStatus.BAD_REQUEST);
            }

            const checkBookAlreadyExist = await bookRepository.getByTitle(title);

            if (checkBookAlreadyExist) {
                return response.error('O livro já existe', HttpStatus.BAD_REQUEST);
            }

            await bookRepository.create({ title, synopsis, url_image, genre_id, author_id });

            return response.success('Livro foi criado com sucesso', HttpStatus.CREATED);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    update = async (id: number, title: string, synopsis: string, url_image: string, genre_id: number, author_id: number) => {
        try {
            if (!id ) {
                return response.error('O id do livro é obrigatório', HttpStatus.BAD_REQUEST);
            }

            const checkBookExist = await bookRepository.getById(id);

            if (!checkBookExist) {
                return response.error(`Livro de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }
        
            await bookRepository.update(id, { title, synopsis, url_image, genre_id, author_id });

            return response.success('Livro foi atualizado com sucesso', HttpStatus.OK);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    exclude = async (id: number) => {
        try {
            if (!id) {
                return response.error('O id é obrigatório', HttpStatus.BAD_REQUEST);
            }

            const checkBookExist = await bookRepository.getById(id);

            if (!checkBookExist) {
                response.error(`Livro de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            await bookRepository.exclude(id);

            return response.success('Livro foi excluído com sucesso', HttpStatus.OK);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    getByTitle = async (title: string) => {
        try {
            if (!title) {
                return response.error('O título é obrigatório', HttpStatus.BAD_REQUEST);
            }

            const book = await bookRepository.getByTitle(title);

            if (!book) {
                return response.error(`Livro de título ${title} não encontrado`, HttpStatus.NOT_FOUND);
            }

            return response.success(book, HttpStatus.OK);

        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };

    createWithCompleteInfo = async (title: string, synopsis: string, url_image: string, genre_id: number, authorName: string) => {
        try {
            if (!title || !synopsis || !url_image || !genre_id || !authorName ) {
                return response.error('Dados inválidos', HttpStatus.BAD_REQUEST);
            }

            const checkBookAlreadyExist = await bookRepository.getByTitle(title);

            if (checkBookAlreadyExist) {
                return response.error('O livro já existe', HttpStatus.BAD_REQUEST);
            }

            const checkGenreExist = await genreRepository.getById(genre_id);

            if (!checkGenreExist) {
                return response.error('O gênero não existe', HttpStatus.BAD_REQUEST);
            }

            const checkAuthorAlreadyExist = await authorRepository.getByName(authorName);

            if (checkAuthorAlreadyExist) {
                await bookRepository.create({ title, synopsis, genre_id, url_image, author_id: checkAuthorAlreadyExist.id });

                return response.success('Livro com autor existente foi criado com sucesso', HttpStatus.CREATED);
            }

            const newAuthor = await authorRepository.create({ name: authorName });
            await bookRepository.create({ title, synopsis, genre_id, url_image, author_id: newAuthor.id });

            return response.success('Livro foi criado com sucesso', HttpStatus.CREATED);
        } catch (error) {
            return response.error(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
}
