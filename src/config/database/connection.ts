import { DataSource } from 'typeorm';

export const dbConfig = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'postgres',
    synchronize: false,
    logging: true,
    entities: [process.env.NODE_ENV === 'local' ? './src/entity/*.ts' : './dist/src/entity/*.js'],
});