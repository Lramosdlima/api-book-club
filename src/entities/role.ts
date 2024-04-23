import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('role')
export class RoleEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        type: string;

    @CreateDateColumn({ select: false })
        created_at: Date;

    @UpdateDateColumn({ select: false })
        updated_at!: Date;

    @DeleteDateColumn({ select: false })
        deleted_at!: Date;
}