import { ResponseOn } from '../config/utils/response';
import { BookEntity } from '../entities/book';
import { AuthorRepository } from '../repositories/author';
import { BookRepository } from '../repositories/book';
import { GenreRepository } from '../repositories/genre';
import { InteractionRepository } from '../repositories/interaction';
import { CreateBookDTO, UpdateBookDTO } from '../types/dto';
import { HttpStatus } from '../types/http_status_type';

const response = new ResponseOn();
const bookRepository = new BookRepository();
const genreRepository = new GenreRepository();
const authorRepository = new AuthorRepository();
const interactionRepository = new InteractionRepository();

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
    getAllWithCompleteInfo = async (page?: number, limit?: number) => {
        try {
            const books = await bookRepository.getAll();

            if (books.length === 0 || !books) {
                return response.error('Nenhum livro encontrado', 404);
            }

            const filterBooks = await getBookInfo(books);

            return response.success(filterBooks, 200);

        } catch (error) {
            return response.error(error, 500);
        }
    };

    getById = async (id: number) => {
        try {
            if (!id) {
                return response.unsuccessfully('O id do livro é obrigatório');
            }

            const book = await bookRepository.getById(id);

            if (!book) {
                return response.error(`Livro de id ${id} não encontrado`, 404);
            }

            return response.success(book, 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    createWithAuthorAlreadyExists = async (createBookDTO: CreateBookDTO) => {
        try {
            const { title, synopsis, url_image, genre_id, author_id } = createBookDTO;

            if (!title || !genre_id) {
                return response.unsuccessfully('O nome e o id do gênero são obrigatórios');
            }

            const checkBookExist = await bookRepository.getByTitle(title);

            if (!checkBookExist) {
                return response.error('O livro já existe', 400);
            }

            await bookRepository.create({ title, synopsis, url_image, genre_id, author_id });

            return response.success('Livro foi criado com sucesso', 201);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    update = async (id: number, updateBookDTO: UpdateBookDTO) => {
        try {
            if (!id) {
                return response.unsuccessfully('O id do livro é obrigatório');
            }

            if (!updateBookDTO) {
                return response.unsuccessfully('Os dados do livro são obrigatórios');
            }

            const { title, synopsis, url_image, genre_id, author_id } = updateBookDTO;

            const checkBookExist = await bookRepository.getById(id);

            if (!checkBookExist) {
                return response.error(`Livro de id ${id} não encontrado`, 404);
            }
        
            await bookRepository.update(id, { title, synopsis, url_image, genre_id, author_id });

            return response.success('Livro foi atualizado com sucesso', 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    exclude = async (id: number) => {
        try {
            if (!id) {
                return response.unsuccessfully('O id do livro é obrigatório');
            }

            const checkBookExist = await bookRepository.getById(id);

            if (!checkBookExist) {
                response.error(`Livro de id ${id} não encontrado`, 404);
            }

            await bookRepository.exclude(id);

            return response.success('Livro foi excluído com sucesso', 200);
        } catch (error) {
            return response.error(error, 500);
        }
    };

    getByTitle = async (title: string) => {
        try {
            if (!title) {
                return response.error('O título é obrigatório', 400);
            }

            const book = await bookRepository.getByTitle(title);

            if (!book) {
                return response.error(`Livro de título ${title} não encontrado`, 404);
            }

            return response.success(book, 200);

        } catch (error) {
            return response.error(error, 500);
        }
    };

    getByGenreId = async (genre_id: number) => {
        try {
            if (!genre_id) {
                return response.unsuccessfully('O id do gênero é obrigatório');
            }

            const books = await bookRepository.getByGenreId(genre_id);

            if (!books) {
                return response.unsuccessfully('Nenhum livro encontrado', HttpStatus.NOT_FOUND);
            }

            return response.success(books);

        } catch (error) {
            return response.error(error);
        }
    };

    getByAuthorId = async (author_id: number) => {
        try {
            if (!author_id) {
                return response.unsuccessfully('O id do autor é obrigatório');
            }

            const books = await bookRepository.getByAuthorId(author_id);

            if (!books) {
                return response.unsuccessfully('Nenhum livro encontrado', HttpStatus.NOT_FOUND);
            }

            return response.success(books);

        } catch (error) {
            return response.error(error);
        }
    };

    getMostLiked = async () => {
        try {
            const booksLiked = await interactionRepository.getBooksLiked();

            if (!booksLiked) {
                return response.unsuccessfully('Nenhum livro com gostei encontrado', HttpStatus.NOT_FOUND);
            }

            const countLikes = booksLiked.reduce((acc, interaction) => {
                acc[interaction.book.id] = (acc[interaction.book.id] || 0) + 1;
                return acc;
            });
    
            const mostLikedBooks = booksLiked
                .filter((interaction) => countLikes[interaction.book.id] > 0)
                .sort((a, b) => countLikes[b.book.id] - countLikes[a.book.id])
                .slice(0, 5);

            return response.success(mostLikedBooks);

        } catch (error) {
            return response.error(error);
        }
    };

    createWithCompleteInfo = async (title: string, synopsis: string, url_image: string, genre_id: number, authorName: string) => {
        try {
            if (!title || !synopsis || !url_image || !genre_id || !author ) {
                return response.error('Dados inválidos', 400);
            }

            const checkBookExist = await bookRepository.getByTitle(title);

            if (!checkBookExist) {
                return response.error('O livro já existe', 400);
            }

            const checkGenreExist = await genreRepository.getById(genre_id);

            if (!checkGenreExist) {
                return response.error('O gênero não existe', 400);
            }

            const authorExist = await authorRepository.getByName(author);

            if (!authorExist) {
                return response.error('O autor não existe', 400);
            }

            await bookRepository.create({ title, synopsis, genre_id, url_image, author_id: authorExist.id });

            return response.success('Livro foi criado com sucesso', 201);
        } catch (error) {
            return response.error(error, 500);
        }
    };
}
