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
import { CollectionEntity } from './collection';

@Entity('collection_book')
export class CollectionBookEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        book_id: number;

    @ManyToOne(() => BookEntity)
    @JoinColumn({ name: 'book_id' })
        book: BookEntity;

    @Column()
        collection_id: number;

    @ManyToOne(() => CollectionEntity)
    @JoinColumn({ name: 'collection_id' })
        collection: CollectionEntity;
   
    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at!: Date;

    @DeleteDateColumn()
        deleted_at!: Date;
}