import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = {
      name: 'Car test',
      description: 'Car description test',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Car brand test',
      category_id: 'category',
    };

    const carCreated = await createCarUseCase.execute(car);

    expect(carCreated).toHaveProperty('id');
  });

  it('should not be able to create a car with same license plate', async () => {
    expect(async () => {
      const car = {
        name: 'Car test',
        description: 'Car description test',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Car brand test',
        category_id: 'category',
      };

      await createCarUseCase.execute(car);

      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car with available equals true by default', async () => {
    const car = {
      name: 'Car test',
      description: 'Car description test',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Car brand test',
      category_id: 'category',
    };

    const carCreated = await createCarUseCase.execute(car);

    expect(carCreated.available).toBe(true);
  });
});
