import { DataSource } from 'typeorm';

import { Category } from '../modules/cars/entities/Category';
import { Specification } from '../modules/cars/entities/Specification';
import { CreateCategories1658862631345 } from './migrations/1658862631345-CreateCategories';
import { CreateSpecifications1659117982083 } from './migrations/1659117982083-CreateSpecifications';

const dataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'rentx',
  entities: [Category, Specification],
  migrations: [
    CreateCategories1658862631345,
    CreateSpecifications1659117982083,
  ],
});

export function createConnection(host = 'database'): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
