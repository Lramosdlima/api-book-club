import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

import { CollectionEntity } from './collection';
import { UserEntity } from './user';

@Entity('collection_user_add')
export class CollectionUserAddEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        user_id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
        user: UserEntity;

    @Column()
        collection_id: number;

    @ManyToOne(() => CollectionEntity)
    @JoinColumn({ name: 'collection_id' })
        collection: CollectionEntity;

    @Column()
        concluded: boolean;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn({ select: false })
        updated_at!: Date;

    @DeleteDateColumn({ select: false })
        deleted_at!: Date;
}