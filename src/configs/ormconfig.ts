import { UploadFileEntity } from './../upload-file/entities/upload-file.entity';
import { DataSourceOptions } from "typeorm";

const ormconfig: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'metadata', 
    entities: [UploadFileEntity],
    synchronize: true,
}

export default ormconfig;