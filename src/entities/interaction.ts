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

import { BookEntity } from './book';
import { UserEntity } from './user';

@Entity( 'interaction')
export class InteractionEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        book_id: number;

    @ManyToOne(() => BookEntity)
    @JoinColumn({ name: 'book_id' })
        book: BookEntity;

    @Column()
        user_id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
        user: UserEntity;

    @Column()
        already_read: boolean;

    @Column()
        want_to_read: boolean;

    @Column()
        liked: boolean;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at: Date;

    @DeleteDateColumn()
        deleted_at: Date;
}