import { AppDataSource } from '../database/connection';
import { TagEntity } from '../entities/tag';
import { CreateTagDTO, UpdateTagDTO } from '../types/dto';

const tagRepository = AppDataSource.getRepository(TagEntity);

export class TagRepository {
    getAll = async (page?: number, limit?: number): Promise<TagEntity[]> => {
        const skipNumber = page || 1;
        const takeNumber = limit || 20;

        return await tagRepository.find({
            skip: (skipNumber - 1) * takeNumber,
            take: takeNumber,
        });
    };

    getById = async (id: number): Promise<TagEntity> => {
        return await tagRepository.findOneBy({ id });
    };

    getByName = async (name: string): Promise<TagEntity> => {
        return await tagRepository.findOneBy({ name });
    };

    create = async (createTagDTO: CreateTagDTO): Promise<TagEntity> => {
        return await tagRepository.save(createTagDTO);
    };

    update = async (id: number, updateTagDTO: UpdateTagDTO): Promise<void> => {
        await tagRepository.update(id, updateTagDTO);
    };

    exclude = async (id: number): Promise<void> => {
        await tagRepository.softDelete({ id });
    };
}
