import { AppDataSource } from '../database/connection';
import { BookUserEntity } from '../entities/book_user';
import { CreateBookUserDTO, UpdateBookUserDTO } from '../types/dto';

const bookUserRepository = AppDataSource.getRepository(BookUserEntity);

export class BookUserRepository {
    getAllByBookId = async (book_id: number, page?: number, limit?: number): Promise<BookUserEntity[]> => {
        const skipNumber = page || 1;
        const takeNumber = limit || 20;

        return await bookUserRepository.find({
            where: { book_id },
            skip: (skipNumber - 1) * takeNumber,
            take: takeNumber,
        });
    };

    getAllByUserId(user_id: number, page?: number, limit?: number): Promise<BookUserEntity[]> {
        const skipNumber = page || 1;
        const takeNumber = limit || 20;

        return bookUserRepository.find({
            where: { user_id },
            skip: (skipNumber - 1) * takeNumber,
            take: takeNumber,
        });
    }

    getById = async (id: number): Promise<BookUserEntity> => {
        return await bookUserRepository.findOneBy({ id });
    };

    getByUserIdAndBookId = async (user_id: number, book_id: number): Promise<BookUserEntity> => {
        return await bookUserRepository.findOneBy({ user_id, book_id });
    };

    create = async (createBookUserDTO: CreateBookUserDTO): Promise<BookUserEntity> => {
        return await bookUserRepository.save(createBookUserDTO);
    };

    update = async (id: number, updateBookUserDTO: UpdateBookUserDTO): Promise<void> => {
        await bookUserRepository.update(id, updateBookUserDTO);
    };

    exclude = async (id: number): Promise<void> => {
        await bookUserRepository.delete({ id });
    };
}
