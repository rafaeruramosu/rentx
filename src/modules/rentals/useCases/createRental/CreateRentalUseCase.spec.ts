import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe('Create rental', () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it('should be able to create a new rental', async () => {
    const rental = {
      user_id: '12345',
      car_id: '121212',
      expected_return_date: new Date(),
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
        expected_return_date: new Date(),
      };

      const rental2 = {
        user_id: '12345',
        car_id: '212121',
        expected_return_date: new Date(),
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
        expected_return_date: new Date(),
      };

      const rental2 = {
        user_id: '54321',
        car_id: '121212',
        expected_return_date: new Date(),
      };

      await createRentalUseCase.execute(rental1);

      await createRentalUseCase.execute(rental2);
    }).rejects.toBeInstanceOf(AppError);
  });
});
