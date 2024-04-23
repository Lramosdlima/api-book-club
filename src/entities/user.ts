import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { RoleEntity } from './role';

@Entity('user')
export class UserEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        name: string;

    @Column()
        email: string;

    @Column()
        password: string;

    @Column()
        profile_picture: string;

    @Column()
        role_id: number;

    @ManyToOne(() => RoleEntity)
    @JoinColumn({ name: 'role_id' })
        role: RoleEntity;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn({ select: false })
        updated_at!: Date;

    @DeleteDateColumn({ select: false })
        deleted_at!: Date;
}