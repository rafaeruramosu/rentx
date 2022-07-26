import { DataSource } from 'typeorm';

import { Category } from '../modules/cars/entities/Category';
import { CreateCategories1658862631345 } from './migrations/1658862631345-CreateCategories';

const dataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'rentx',
  entities: [Category],
  migrations: [CreateCategories1658862631345],
});

export function createConnection(host = 'database'): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
