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

@Entity('collection')
export class CollectionEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        title: string;

    @Column()
        owner_id: string;


    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'owner_id' })
        owner: UserEntity;

    @Column()
        description: number;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at!: Date;

    @DeleteDateColumn()
        deleted_at!: Date;
}

