import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListCarsUseCase } from './ListCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListCarsUseCase;

describe('List cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car test',
      description: 'Car description test',
      daily_rate: 110,
      license_plate: 'ABC-1234',
      fine_amount: 40,
      brand: 'Car brand test',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car test',
      description: 'Car description test',
      daily_rate: 110,
      license_plate: 'ABC-1234',
      fine_amount: 40,
      brand: 'Car brand test',
      category_id: 'category_id',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'Car brand test',
    });

    expect(cars).toEqual([car]);
  });
});
