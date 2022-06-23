import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm'

const DEFAULT_PSQL_HOST = 'localhost'
const DEFAULT_PSQL_PORT = 5432

export const ormconfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        return {
            type: 'postgres',
            entities: ['dist/**/*.entity.{ts,js}'],
            database: configService.get<string>('PSQL_DATABASE'),
            host: configService.get('PSQL_HOST') || DEFAULT_PSQL_HOST,
            port: configService.get('PSQL_PORT') || DEFAULT_PSQL_PORT,
            username: configService.get('PSQL_USERNAME'),
            password: configService.get('PSQL_PASS'),
            synchronize: true
        }
    },
    inject: [ConfigService],
}