import { ResponseOn } from '../config/utils/response';
import { BookEntity } from '../entities/book';
import { AuthorRepository } from '../repositories/author';
import { BookRepository } from '../repositories/book';
import { GenreRepository } from '../repositories/genre';
import { InteractionRepository } from '../repositories/interaction';
import { CreateBookDTO, UpdateBookDTO } from '../types/dto';
import { HttpStatus } from '../types/http_status_type';
import NodeCache from 'node-cache';

const response = new ResponseOn();
const bookRepository = new BookRepository();
const genreRepository = new GenreRepository();
const authorRepository = new AuthorRepository();
const interactionRepository = new InteractionRepository();

const CACHE_LIMIT = Number(process.env.CACHE_LIMIT) || 3600; 
const dbCache = new NodeCache({ stdTTL: CACHE_LIMIT, checkperiod: 0.2 });

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
    getAllWithCompleteInfo = async (page?: number, limit?: number) => {
        const allBooksCached = `@api-book-club-cache::allBooks${page};${limit}`;

        if (dbCache.has(allBooksCached)) {
            const cachedResponse = dbCache.get(allBooksCached);
            return response.success(cachedResponse);
        }

        try {
            const books = await bookRepository.getAllComplete(page, limit);

            if (books.length === 0 || !books) {
                return response.unsuccessfully('Nenhum livro encontrado', HttpStatus.NOT_FOUND);
            }

            const filterBooks = formatBookInfo(books);

            dbCache.set(allBooksCached, filterBooks, CACHE_LIMIT);

            return response.success(filterBooks);

        } catch (error) {
            return response.error(error);
        }
    };

    getById = async (id: number) => {
        try {
            if (!id) {
                return response.unsuccessfully('O id do livro é obrigatório');
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

    createWithAuthorAlreadyExists = async (createBookDTO: CreateBookDTO) => {
        try {
            const { title, synopsis, url_image, genre_id, author_id } = createBookDTO;

            if (!title || !genre_id || !author_id) {
                return response.unsuccessfully('O nome do livro, o id do gênero e o id do autor são obrigatórios');
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
                return response.unsuccessfully('O id do livro é obrigatório');
            }

            const checkBookExist = await bookRepository.getById(id);

            if (!checkBookExist) {
                return response.unsuccessfully(`Livro de id ${id} não encontrado`, HttpStatus.NOT_FOUND);
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
        const mostLikedCached = '@api-book-club-cache::mostLikedBooks';

        if (dbCache.has(mostLikedCached)) {
            const cachedResponse = dbCache.get(mostLikedCached);
            return response.success(cachedResponse);
        }

        try {
            const booksLiked = await interactionRepository.getBooksLiked();

            if (!booksLiked || booksLiked.length === 0) {
                return response.unsuccessfully('Nenhum livro com gostei encontrado', HttpStatus.NOT_FOUND);
            }

            const booksWithLikes = booksLiked.map((interaction) => {
                return {
                    ...interaction.book,
                    liked: interaction.liked
                };
            });
            
            const uniqueBooks = booksLiked.map((book) => {
                return { ...book.book };
            }).filter((book, index, self) => {
                return index === self.findIndex((t) => t.id === book.id);
            });

            const countedBooks = uniqueBooks.map((book) => {
                return {
                    ...book,
                    liked: booksWithLikes.filter((likedBook) => likedBook.id === book.id).length
                };
            });

            const orderedBooks = countedBooks.sort((a, b) => {
                return b.liked - a.liked;
            });
            
            const mostLikedBooksFiltered = orderedBooks.slice(0, 5);
            
            const booksFormateds = mostLikedBooksFiltered.map((bookInteraction) => {
                return formatBookInfo([bookInteraction]);
            });

            const finalResponse = booksFormateds.flatMap((book) =>  book);

            dbCache.set(mostLikedCached, finalResponse, CACHE_LIMIT);

            return response.success(finalResponse);

        } catch (error) {
            return response.error(error);
        }
    };

    createWithCompleteInfo = async (title: string, synopsis: string, url_image: string, genre_id: number, authorName: string) => {
        try {
            if (!title || !genre_id || !authorName ) {
                return response.unsuccessfully('O título do livro, id do gênero e o nome do autor são obrigatórios');
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
