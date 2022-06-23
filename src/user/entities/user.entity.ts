import { UploadFileEntity } from './../../upload-file/entities/upload-file.entity';
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';
import {hash} from 'bcrypt'

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string;

    @Column()
    username: string;

    @Column({default: 50})
    memory: number;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10)
    }

    @OneToMany(() => UploadFileEntity, uploadFile => uploadFile.user)
    files: UploadFileEntity[];
}
