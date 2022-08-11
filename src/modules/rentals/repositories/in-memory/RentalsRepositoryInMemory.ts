import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return this.rentals.find(r => r.user_id === user_id && r.end_date === null);
  }
  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return this.rentals.find(r => r.car_id === car_id && r.end_date === null);
  }
  create(
    user_id: string,
    car_id: string,
    expected_return_date: Date,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { RentalsRepositoryInMemory };
