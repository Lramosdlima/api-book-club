import { AppDataSource } from '../database/connection';
import { CollectionEntity } from '../entities/collection';
import { CollectionBookEntity } from '../entities/collection_book';
import { CollectionUserAddEntity } from '../entities/collection_user_add';
import { CreateCollectionDTO, UpdateCollectionDTO } from '../types/dto';

const collectionRepository = AppDataSource.getRepository(CollectionEntity);
const collectionUserAddRepository = AppDataSource.getRepository(CollectionUserAddEntity);
const collectionBookRepository = AppDataSource.getRepository(CollectionBookEntity);

export class CollectionRepository {
    getAll = async (page?: number, limit?: number): Promise<CollectionBookEntity[]> => {
        const skipNumber = page || 1;
        const takeNumber = limit || 20;

        return await collectionBookRepository.find({
            skip: (skipNumber - 1) * takeNumber,
            take: takeNumber,
            relations: ['collection', 'collection.owner', 'book', 'book.author', 'book.genre'],
        });
    };

    getById = async (id: number): Promise<CollectionEntity | null> => {
        return await collectionRepository.findOneBy({ id });
    };

    getCollectionBookById = async (id: number): Promise<CollectionBookEntity[] | null> => {
        return await collectionBookRepository.find({
            where: { collection_id: id },
            relations: ['collection', 'collection.owner', 'book', 'book.author', 'book.genre']
        });
    };

    getByTitle = async (title: string): Promise<CollectionEntity | null> => {
        return await collectionRepository.findOneBy({ title });
    };

    getAllByOwnerId = async (owner_id: number): Promise<CollectionBookEntity[]> => {
        return await collectionBookRepository.find({
            where: {
                collection: { owner_id },
            },
            relations: ['collection', 'collection.owner', 'book', 'book.author', 'book.genre'],
        });
    };

    getAllAddedByUserId = async (user_id: number): Promise<CollectionUserAddEntity[]> => {
        return await collectionUserAddRepository.find({
            where: { user_id },
            relations: ['collection', 'collection.owner'],
        });
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
        await collectionRepository.softDelete({ id });
    };

    removeCollectionFromUser = async (id: number): Promise<void> => {
        await collectionUserAddRepository.softDelete({ id });
    };
}
