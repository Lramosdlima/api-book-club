import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('author')
export class AuthorEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        name: string;

    @Column()
        description: string;

    @Column()
        photo: string;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at!: Date;

    @DeleteDateColumn()
        deleted_at!: Date;
}