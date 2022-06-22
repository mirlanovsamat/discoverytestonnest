import { UploadFileEntity } from './../upload-file/entities/upload-file.entity';
import { DataSourceOptions } from "typeorm";

const ormconfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.PSQL_HOST,
    port: parseInt(process.env.PSQL_PORT),
    username: process.env.PSQL_USERNAME,
    password: process.env.PSQL_PASSWORD,
    database: process.env.PSQL_DATABASE, 
    entities: [UploadFileEntity],
    synchronize: true,
}

export default ormconfig;