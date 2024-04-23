import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('genre')
export class GenreEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        name: string;

    @Column()
        description: string;

    @CreateDateColumn({ select: false })
        created_at: Date;

    @UpdateDateColumn({ select: false })
        updated_at!: Date;

    @DeleteDateColumn({ select: false })
        deleted_at!: Date;
}