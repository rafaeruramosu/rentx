import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
  findAvailable(
    brand?: string,
    name?: string,
    category_id?: string,
  ): Promise<Car[]>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  create(data: ICreateCarDTO): Promise<Car>;
}

export { ICarsRepository };
