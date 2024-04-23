import { AppDataSource } from '../database/connection';
import { BookEntity } from '../entities/book';
import { CreateBookDTO, UpdateBookDTO } from '../types/dto';

const bookRepository = AppDataSource.getRepository(BookEntity);

export class BookRepository {
    getAllComplete = async (page?: number, limit?: number): Promise<BookEntity[]> => {
        const skipNumber = page || 1;
        const takeNumber = limit || 20;

        return await bookRepository.find({
            relations: ['author', 'genre'],
            skip: (skipNumber - 1) * takeNumber,
            take: takeNumber,
        });
    };

    getById = async (id: number): Promise<BookEntity> => {
        return await bookRepository.findOneBy({ id });
    };

    getByTitle = async (title: string): Promise<BookEntity> => {
        return await bookRepository.findOneBy({ title });
    };

    getByAuthorId = async (author_id: number): Promise<BookEntity[]> => {
        return await bookRepository.findBy({ author_id });
    };

    getByGenreId = async (genre_id: number): Promise<BookEntity[]> => {
        return await bookRepository.findBy({ genre_id });
    };

    create = async (createBookDTO: CreateBookDTO): Promise<BookEntity> => {
        return await bookRepository.save(createBookDTO);
    };

    update = async (id: number, updateBookDTO: UpdateBookDTO): Promise<void> => {
        await bookRepository.update(id, updateBookDTO);
    };

    exclude = async (id: number): Promise<void> => {
        await bookRepository.softDelete({ id });
    };
}
