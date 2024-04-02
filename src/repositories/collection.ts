import { AppDataSource } from '../database/connection';
import { CollectionEntity } from '../entities/collection';
import { CollectionBookEntity } from '../entities/collection_book';
import { CollectionUserAddEntity } from '../entities/collection_user_add';
import { CreateCollectionDTO, UpdateCollectionDTO } from '../types/dto';

const collectionRepository = AppDataSource.getRepository(CollectionEntity);
const collectionUserAddRepository = AppDataSource.getRepository(CollectionUserAddEntity);
const collectionBookRepository = AppDataSource.getRepository(CollectionBookEntity);

export class CollectionRepository {
    getAll = async (page?: number, limit?: number): Promise<CollectionEntity[]> => {
        const skipNumber = page || 1;
        const takeNumber = limit || 20;

        return await collectionRepository.find({
            skip: (skipNumber - 1) * takeNumber,
            take: takeNumber,
        });
    };

    getById = async (id: number): Promise<CollectionEntity> => {
        return await collectionRepository.findOneBy({ id });
    };

    getAllByOwnerId = async (owner_id: number): Promise<CollectionEntity[]> => {
        return await collectionRepository.find({ where: { owner_id } });
    };

    addCollectionToUser = async (collection_id: number, user_id: number): Promise<CollectionUserAddEntity> => {
        return collectionUserAddRepository.save({ collection_id, user_id });
    };

    addBookToCollection = async (collection_id: number, book_id: number): Promise<CollectionBookEntity> => {
        return collectionBookRepository.save({ collection_id, book_id });
    };

    create = async (createCollectionDTO: CreateCollectionDTO): Promise<CollectionEntity> => {
        return await collectionRepository.save(createCollectionDTO);
    };

    update = async (id: number, updateCollectionDTO: UpdateCollectionDTO): Promise<void> => {
        await collectionRepository.update(id, updateCollectionDTO);
    };

    exclude = async (id: number): Promise<void> => {
        await collectionRepository.delete({ id });
    };

    removeCollectionFromUser = async (id: number): Promise<void> => {
        await collectionUserAddRepository.delete({ id });
    };
}
