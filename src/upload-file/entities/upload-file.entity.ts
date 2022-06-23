import { UserEntity } from './../../user/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

    @ManyToOne(() => UserEntity, user => user.files)
    user: UserEntity;
}
