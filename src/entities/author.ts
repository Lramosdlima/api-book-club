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

    @CreateDateColumn({ select: false })
        created_at: Date;

    @UpdateDateColumn({ select: false })
        updated_at!: Date;

    @DeleteDateColumn({ select: false })
        deleted_at!: Date;
}