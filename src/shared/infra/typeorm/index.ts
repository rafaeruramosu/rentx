import { DataSource } from 'typeorm';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { CreateCategories1658862631345 } from './migrations/1658862631345-CreateCategories';
import { CreateSpecifications1659117982083 } from './migrations/1659117982083-CreateSpecifications';
import { CreateUsers1659120825949 } from './migrations/1659120825949-CreateUsers';
import { AlterUserDeleteUsername1659123687178 } from './migrations/1659123687178-AlterUserDeleteUsername';
import { AlterUserAddAvatar1659192192682 } from './migrations/1659192192682-AlterUserAddAvatar';
import { CreateCars1659985945421 } from './migrations/1659985945421-CreateCars';
import { CreateSpecificationsCars1660061797866 } from './migrations/1660061797866-CreateSpecificationsCars';
import { CreateCarImages1660066326667 } from './migrations/1660066326667-CreateCarImages';
import { CreateRentals1660239155769 } from './migrations/1660239155769-CreateRentals';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: process.env.NODE_ENV === 'test' ? 'rentx_test' : 'rentx',
  synchronize: false,
  logging: false,
  entities: [Category, Specification, User, Car, CarImage, Rental],
  migrations: [
    CreateCategories1658862631345,
    CreateSpecifications1659117982083,
    CreateUsers1659120825949,
    AlterUserDeleteUsername1659123687178,
    AlterUserAddAvatar1659192192682,
    CreateCars1659985945421,
    CreateSpecificationsCars1660061797866,
    CreateCarImages1660066326667,
    CreateRentals1660239155769,
  ],
  subscribers: [],
});

export function createConnection(
  host = process.env.NODE_ENV === 'test' ? 'localhost' : 'database',
): Promise<DataSource> {
  return dataSource.setOptions({ host }).initialize();
}
