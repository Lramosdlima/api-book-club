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
        owner_id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'owner_id' })
        owner: UserEntity;

    @Column()
        description: string;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn({ select: false })
        updated_at!: Date;

    @DeleteDateColumn({ select: false })
        deleted_at!: Date;
}

