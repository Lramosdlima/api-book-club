import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('book')
export class BookEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        title: string;

    @Column()
        synopsis: string;

    @Column()
        url_image: string;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at!: Date;

    @DeleteDateColumn()
        deleted_at!: Date;
}