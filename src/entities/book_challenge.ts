import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { BookEntity } from './book';

@Entity('book_challenge')
export class BookChallengeEntity {
    @PrimaryColumn()
        id: string;

    @Column()
        name: string;

    @Column()
        book_id: number;
    
    @ManyToOne(() => BookEntity)
        book: BookEntity;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at!: Date;

    @DeleteDateColumn()
        deleted_at!: Date;
}