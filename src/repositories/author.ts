import { dbConfig } from '../config/database/connection';
import { AuthorEntity } from '../entities/author';

const authorRepository = dbConfig.getRepository(AuthorEntity);

export class AuthorRepository {
    getAll = async (page?: number, limit?: number): Promise<AuthorEntity[]> => {
        const skipNumber = page || 1;
        const takeNumber = limit || 20;

        return await authorRepository.find({
            skip: (skipNumber - 1) * takeNumber,
            take: takeNumber,
        });
    };

    getById = async (id: number): Promise<AuthorEntity> => {
        return await authorRepository.findOneBy({ id });
    };

    getByName = async (name: string): Promise<AuthorEntity> => {
        return await authorRepository.findOneBy({ name });
    };

    create = async (name: string, description: string): Promise<void> => {
        await authorRepository.insert({ name, description });
    };

    update = async (id: number, name: string, description: string): Promise<void> => {
        await authorRepository.update(id, { name, description });
    };

    exclude = async (id: number): Promise<void> => {
        await authorRepository.delete({ id });
    };
}