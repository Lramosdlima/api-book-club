import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { CommunityEntity } from './community';
import { UserEntity } from './user';

@Entity('community_user')
export class CommunityUserEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        community_id: number;

    @ManyToOne(() => CommunityEntity)
        community: CommunityEntity;

    @Column()
        user_id: number;

    @ManyToOne(() => UserEntity)
        user: UserEntity;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at!: Date;

    @DeleteDateColumn()
        deleted_at!: Date;
}