import { DataSource } from 'typeorm';

import { CreateCategories1658862631345 } from './migrations/1658862631345-CreateCategories';

const dataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'rentx',
  migrations: [CreateCategories1658862631345],
});

export function createConnection(host = 'database'): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
