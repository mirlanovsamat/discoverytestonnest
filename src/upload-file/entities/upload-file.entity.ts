import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UploadFileEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column()
    mimetype: string

    @Column()
    size: number
}
