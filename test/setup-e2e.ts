import { DataSource } from 'typeorm';
import { randomUUID } from 'node:crypto';
import 'dotenv/config';
import { execSync } from 'node:child_process';

const schemaId = randomUUID();

function generateUniqueDatabaseUrl(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.');
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set('schema', schemaId);

  return url.toString();
}

const databaseUrl = generateUniqueDatabaseUrl(schemaId);

const testDataSource = new DataSource({
  type: 'postgres',
  url: databaseUrl,
  entities: ['src/modules/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: false,
});

beforeAll(async () => {
  process.env.DATABASE_URL = databaseUrl;

  execSync('pnpm typeorm migration:run');

  await testDataSource.initialize();
});

afterAll(async () => {
  await testDataSource.query(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
  await testDataSource.destroy();
});
