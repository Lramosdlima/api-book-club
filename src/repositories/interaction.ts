import { AppDataSource } from '../database/connection';
import { InteractionEntity } from '../entities/interaction';
import { CreateInteractionDTO, UpdateInteractionDTO } from '../types/dto';

const interactionRepository = AppDataSource.getRepository(InteractionEntity);

export class InteractionRepository {
    getAllByBookId = async (book_id: number, page?: number, limit?: number): Promise<InteractionEntity[]> => {
        const skipNumber = page || 1;
        const takeNumber = limit || 20;

        return await interactionRepository.find({
            where: { book_id },
            skip: (skipNumber - 1) * takeNumber,
            take: takeNumber,
        });
    };

    getAllByUserId = async (user_id: number, page?: number, limit?: number): Promise<InteractionEntity[]> => {
        const skipNumber = page || 1;
        const takeNumber = limit || 20;

        return await interactionRepository.find({
            where: { user_id },
            relations: ['book'],
            skip: (skipNumber - 1) * takeNumber,
            take: takeNumber,
        });
    };

    getEspecificByUserId = async (user_id: number, already_read: boolean, want_to_read: boolean, liked: boolean ): Promise<InteractionEntity[]> => {
        return await interactionRepository.find({
            where: {
                user_id,
                already_read,
                want_to_read,
                liked,
            },
            relations: ['book'],
        });
    };

    getById = async (id: number): Promise<InteractionEntity> => {
        return await interactionRepository.findOneBy({ id });
    };

    getByUserIdAndBookId = async (user_id: number, book_id: number): Promise<InteractionEntity> => {
        return await interactionRepository.findOneBy({ user_id, book_id });
    };

    getBooksLiked = async (): Promise<InteractionEntity[]> => {
        return await interactionRepository.find({
            select: ['book', 'liked'],
            where: { liked: true },
            relations: ['book'],
        });
    };

    create = async (createInteractionDTO: CreateInteractionDTO): Promise<InteractionEntity> => {
        return await interactionRepository.save(createInteractionDTO);
    };

    update = async (id: number, updateInteractionDTO: UpdateInteractionDTO): Promise<void> => {
        await interactionRepository.update(id, updateInteractionDTO);
    };

    exclude = async (id: number): Promise<void> => {
        await interactionRepository.delete({ id });
    };
}
