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

function formatBookInfo(books: BookEntity[]) {
    return books.map((book) => {
        return {
            id: book.id,
            title: book.title,
            synopsis: book.synopsis,
            imageUrl: book.url_image,
            genre: book.genre,
            author: book.author,
        };
    });
}

export class BookService {
    getAll = async (page?: number, limit?: number) => {
        try {
            const books = await bookRepository.getAll(page, limit);

            if (books.length === 0 || !books) {
                return response.unsuccessfully('Nenhum livro encontrado', HttpStatus.NOT_FOUND);
            }

            return response.success(books);

        } catch (error) {
            return response.error(error);
        }
    };

    getAllWithCompleteInfo = async (page?: number, limit?: number) => {
        try {
            const books = await bookRepository.getAllComplete(page, limit);

            if (books.length === 0 || !books) {
                return response.unsuccessfully('Nenhum livro encontrado', HttpStatus.NOT_FOUND);
            }

            const filterBooks = formatBookInfo(books);

            return response.success(filterBooks);

        } catch (error) {
            return response.error(error);
        }
    };

    getById = async (id: number) => {
        try {
            if (!id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const book = await bookRepository.getById(id);

            if (!book) {
                return response.unsuccessfully(`Livro de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            return response.success(book);
        } catch (error) {
            return response.error(error);
        }
    };

    createWithAuthorExist = async (title: string, synopsis: string, url_image: string, genre_id: number, author_id: number) => {
        try {
            if (!title || !genre_id) {
                return response.unsuccessfully('O nome e o id do gênero são obrigatórios');
            }

            const checkBookAlreadyExist = await bookRepository.getByTitle(title);

            if (checkBookAlreadyExist) {
                return response.unsuccessfully('O livro já existe');
            }

            await bookRepository.create({ title, synopsis, url_image, genre_id, author_id });

            return response.success('Livro foi criado com sucesso', HttpStatus.CREATED);
        } catch (error) {
            return response.error(error);
        }
    };

    update = async (id: number, title: string, synopsis: string, url_image: string, genre_id: number, author_id: number) => {
        try {
            if (!id ) {
                return response.unsuccessfully('O id do livro é obrigatório');
            }

            const checkBookExist = await bookRepository.getById(id);

            if (!checkBookExist) {
                return response.unsuccessfully(`Livro de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }
        
            await bookRepository.update(id, { title, synopsis, url_image, genre_id, author_id });

            return response.success('Livro foi atualizado com sucesso');
        } catch (error) {
            return response.error(error);
        }
    };

    exclude = async (id: number) => {
        try {
            if (!id) {
                return response.unsuccessfully('O id é obrigatório');
            }

            const checkBookExist = await bookRepository.getById(id);

            if (!checkBookExist) {
                response.unsuccessfully(`Livro de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
            }

            await bookRepository.exclude(id);

            return response.success('Livro foi excluído com sucesso');
        } catch (error) {
            return response.error(error);
        }
    };

    getByTitle = async (title: string) => {
        try {
            if (!title) {
                return response.unsuccessfully('O título é obrigatório');
            }

            const book = await bookRepository.getByTitle(title);

            if (!book) {
                return response.unsuccessfully(`Livro de título ${title} não encontrado`, HttpStatus.NOT_FOUND);
            }

            return response.success(book);

        } catch (error) {
            return response.error(error);
        }
    };

    createWithCompleteInfo = async (title: string, synopsis: string, url_image: string, genre_id: number, authorName: string) => {
        try {
            if (!title || !synopsis || !url_image || !genre_id || !authorName ) {
                return response.unsuccessfully('Dados inválidos');
            }

            const checkBookAlreadyExist = await bookRepository.getByTitle(title);

            if (checkBookAlreadyExist) {
                return response.unsuccessfully('O livro já existe');
            }

            const checkGenreExist = await genreRepository.getById(genre_id);

            if (!checkGenreExist) {
                return response.unsuccessfully('O gênero não existe');
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
            return response.error(error);
        }
    };
}
