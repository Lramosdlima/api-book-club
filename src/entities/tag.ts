import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tag')
export class TagEntity {
    @PrimaryColumn()
        id: number;

    @Column()
        name: string;
}