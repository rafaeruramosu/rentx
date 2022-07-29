import { DataSource } from 'typeorm';

import { User } from '../modules/accounts/entities/User';
import { Category } from '../modules/cars/entities/Category';
import { Specification } from '../modules/cars/entities/Specification';
import { CreateCategories1658862631345 } from './migrations/1658862631345-CreateCategories';
import { CreateSpecifications1659117982083 } from './migrations/1659117982083-CreateSpecifications';
import { CreateUsers1659120825949 } from './migrations/1659120825949-CreateUsers';
import { AlterUserDeleteUsername1659123687178 } from './migrations/1659123687178-AlterUserDeleteUsername';

const dataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'rentx',
  entities: [Category, Specification, User],
  migrations: [
    CreateCategories1658862631345,
    CreateSpecifications1659117982083,
    CreateUsers1659120825949,
    AlterUserDeleteUsername1659123687178,
  ],
});

export function createConnection(host = 'database'): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
