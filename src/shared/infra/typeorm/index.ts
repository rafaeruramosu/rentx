import { DataSource } from 'typeorm';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import { CreateCategories1658862631345 } from './migrations/1658862631345-CreateCategories';
import { CreateSpecifications1659117982083 } from './migrations/1659117982083-CreateSpecifications';
import { CreateUsers1659120825949 } from './migrations/1659120825949-CreateUsers';
import { AlterUserDeleteUsername1659123687178 } from './migrations/1659123687178-AlterUserDeleteUsername';
import { AlterUserAddAvatar1659192192682 } from './migrations/1659192192682-AlterUserAddAvatar';
import { CreateCars1659985945421 } from './migrations/1659985945421-CreateCars';

const dataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'rentx',
  entities: [Category, Specification, User, Car],
  migrations: [
    CreateCategories1658862631345,
    CreateSpecifications1659117982083,
    CreateUsers1659120825949,
    AlterUserDeleteUsername1659123687178,
    AlterUserAddAvatar1659192192682,
    CreateCars1659985945421,
  ],
});

export function createConnection(host = 'database'): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}

export default dataSource;
