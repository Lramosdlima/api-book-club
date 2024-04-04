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

@Entity( 'user_book_rate')
export class UserBookRateEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        user_id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
        user: UserEntity;

    @Column()
        book_id: number;

    @ManyToOne(() => BookEntity)
    @JoinColumn({ name: 'book_id' })
        book: BookEntity;

    @Column()
        comment: string;

    @Column()
        rate: number;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at: Date;

    @DeleteDateColumn()
        deleted_at: Date;
}