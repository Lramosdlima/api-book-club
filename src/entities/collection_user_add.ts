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

import { UserEntity } from './user';
import { CollectionEntity } from './collection';

@Entity('collection_user_add')
export class CollectionUserAddEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        title: string;

    @Column()
        user_id: string;


    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
        user: UserEntity;

    @Column()
        collection_id: string;


    @ManyToOne(() => CollectionEntity)
    @JoinColumn({ name: 'collection_id' })
        collection: CollectionEntity;


    @Column()
        concluded: number;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at!: Date;

    @DeleteDateColumn()
        deleted_at!: Date;
}