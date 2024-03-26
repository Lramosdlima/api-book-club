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
import { TagEntity } from './tag';
import { UserEntity } from './user';

@Entity( 'user_book_tag')
export class UserBookTagEntity {
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
        tag_id: number;

    @ManyToOne(() => TagEntity)
    @JoinColumn({ name: 'tag_id' })
        tag: TagEntity;

    @Column()
        comment: string;

    @Column()
        rate: number;

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