import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe('Create rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it('should be able to create a new rental', async () => {
    const car = {
      name: 'Car test',
      description: 'Car description test',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Car brand test',
      category_id: 'category',
    };

    const carCreated = await carsRepositoryInMemory.create(car);

    const rental = {
      user_id: '12345',
      car_id: carCreated.id,
      expected_return_date: dayAdd24Hours,
    };

    const rentalCreated = await createRentalUseCase.execute(rental);

    expect(rentalCreated).toHaveProperty('id');
    expect(rentalCreated).toHaveProperty('start_date');
  });

  it('should not be able to create a rental if there is another open rental for the same user', async () => {
    const car = {
      name: 'Car test',
      description: 'Car description test',
      daily_rate: 100,
      license_plate: 'ABC-4321',
      fine_amount: 60,
      brand: 'Car brand test',
      category_id: 'category',
    };

    const carCreated = await carsRepositoryInMemory.create(car);

    const rental1 = {
      user_id: '12345',
      car_id: carCreated.id,
      expected_return_date: dayAdd24Hours,
    };

    await rentalsRepositoryInMemory.create(rental1);

    const rental2 = {
      user_id: '12345',
      car_id: carCreated.id,
      expected_return_date: dayAdd24Hours,
    };

    await expect(createRentalUseCase.execute(rental2)).rejects.toEqual(
      new AppError('There is a rental in progress for user'),
    );
  });

  it('should not be able to create a rental if there is another open rental for the same car', async () => {
    const car = {
      name: 'Car test',
      description: 'Car description test',
      daily_rate: 100,
      license_plate: 'ABC-1243',
      fine_amount: 60,
      brand: 'Car brand test',
      category_id: 'category',
    };

    const carCreated = await carsRepositoryInMemory.create(car);

    const rental1 = {
      user_id: '12345',
      car_id: carCreated.id,
      expected_return_date: dayAdd24Hours,
    };

    await rentalsRepositoryInMemory.create(rental1);

    const rental2 = {
      user_id: '54321',
      car_id: carCreated.id,
      expected_return_date: dayAdd24Hours,
    };

    await expect(createRentalUseCase.execute(rental2)).rejects.toEqual(
      new AppError('Car not available'),
    );
  });

  it('should not be able to create a rental with invalid return time', async () => {
    const car = {
      name: 'Car test',
      description: 'Car description test',
      daily_rate: 100,
      license_plate: 'ABC-2134',
      fine_amount: 60,
      brand: 'Car brand test',
      category_id: 'category',
    };

    const carCreated = await carsRepositoryInMemory.create(car);

    const rental = {
      user_id: '12345',
      car_id: carCreated.id,
      expected_return_date: dayjs().toDate(),
    };

    await expect(createRentalUseCase.execute(rental)).rejects.toEqual(
      new AppError('Invalid return time'),
    );
  });
});
