import { AppDataSource } from '../database/connection';
import { UserBookRateEntity } from '../entities/user_book_rate';
import { CreateUserBookRateDTO, UpdateUserBookRateDTO } from '../types/dto';

const userBookRateRepository = AppDataSource.getRepository(UserBookRateEntity);

export class UserBookRateRepository {
    getAll = async (page?: number, limit?: number): Promise<UserBookRateEntity[]> => {
        const skipNumber = page || 1;
        const takeNumber = limit || 20;

        return await userBookRateRepository.find({
            skip: (skipNumber - 1) * takeNumber,
            take: takeNumber,
        });
    };

    getById = async (id: number): Promise<UserBookRateEntity> => {
        return await userBookRateRepository.findOneBy({ id });
    };

    getAllByBookId = async (book_id: number): Promise<UserBookRateEntity[]> => {
        return await userBookRateRepository.find({
            where: { book_id },
            relations: ['user']
        });
    };

    getAllByUserId = async (user_id: number): Promise<UserBookRateEntity[]> => {
        return await userBookRateRepository.find({
            where: { user_id },
            relations: ['user']
        });
    };

    getByUserIdAndBookId = async (user_id: number, book_id: number): Promise<UserBookRateEntity> => {
        return await userBookRateRepository.findOneBy({ user_id, book_id });
    };

    create = async (createUserBookRateDTO: CreateUserBookRateDTO): Promise<UserBookRateEntity> => {
        return await userBookRateRepository.save(createUserBookRateDTO);
    };

    update = async (id: number, updateUserBookRateDTO: UpdateUserBookRateDTO): Promise<void> => {
        await userBookRateRepository.update(id, updateUserBookRateDTO);
    };

    exclude = async (id: number): Promise<void> => {
        await userBookRateRepository.softDelete({ id });
    };
}
