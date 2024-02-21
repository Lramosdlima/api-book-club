import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { CommunityUserEntity } from './community_user';


@Entity('community_chat')
export class CommunityChatEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        community_user_id: number;

    @ManyToOne(() => CommunityUserEntity)
        community_user: CommunityUserEntity;

    @Column()
        message: string;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at!: Date;

    @DeleteDateColumn()
        deleted_at!: Date;
}