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
    const rental = {
      user_id: '12345',
      car_id: '121212',
      expected_return_date: dayAdd24Hours,
    };

    const rentalCreated = await createRentalUseCase.execute(rental);

    expect(rentalCreated).toHaveProperty('id');
    expect(rentalCreated).toHaveProperty('start_date');
  });

  it('should not be able to create a rental if there is another open rental for the same user', async () => {
    expect(async () => {
      const rental1 = {
        user_id: '12345',
        car_id: '121212',
        expected_return_date: dayAdd24Hours,
      };

      const rental2 = {
        user_id: '12345',
        car_id: '212121',
        expected_return_date: dayAdd24Hours,
      };

      await createRentalUseCase.execute(rental1);

      await createRentalUseCase.execute(rental2);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rental if there is another open rental for the same car', async () => {
    expect(async () => {
      const rental1 = {
        user_id: '12345',
        car_id: '121212',
        expected_return_date: dayAdd24Hours,
      };

      const rental2 = {
        user_id: '54321',
        car_id: '121212',
        expected_return_date: dayAdd24Hours,
      };

      await createRentalUseCase.execute(rental1);

      await createRentalUseCase.execute(rental2);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a rental with invalid return time', () => {
    expect(async () => {
      const rental = {
        user_id: '12345',
        car_id: '121212',
        expected_return_date: dayjs().toDate(),
      };

      await createRentalUseCase.execute(rental);
    }).rejects.toBeInstanceOf(AppError);
  });
});
