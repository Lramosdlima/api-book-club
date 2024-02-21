import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';

import { AuthorEntity } from './author';
import { BookEntity } from './book';

@Entity('author_book')
export class AuthorBookEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        author_id: number;

    @OneToOne(() => AuthorEntity)
    @JoinColumn({ name: 'author_id' })
        author: AuthorEntity;

    
    @Column()
        book_id: number;

    @OneToOne(() => BookEntity)
    @JoinColumn({ name: 'book_id' })
        book: BookEntity;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at!: Date;

    @DeleteDateColumn()
        deleted_at!: Date;
}