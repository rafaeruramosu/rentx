import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async findById(id: string): Promise<Car> {
    const car = this.cars.find(c => c.id === id);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find(c => c.license_plate === license_plate);

    return car;
  }

  async findAvailable(
    brand?: string,
    name?: string,
    category_id?: string,
  ): Promise<Car[]> {
    const cars = this.cars.filter(c => {
      if (
        c.available === true ||
        (brand && c.brand === brand) ||
        (name && c.name === name) ||
        (category_id && c.category_id === category_id)
      ) {
        return c;
      }

      return null;
    });

    return cars;
  }

  async create({
    id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(car);

    return car;
  }
}

export { CarsRepositoryInMemory };
