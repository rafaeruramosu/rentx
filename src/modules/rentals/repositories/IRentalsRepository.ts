import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  findOpenRentalByUserId(user_id: string): Promise<Rental>;
  findOpenRentalByCarId(car_id: string): Promise<Rental>;
  create(
    user_id: string,
    car_id: string,
    expected_return_date: Date,
  ): Promise<void>;
}

export { IRentalsRepository };
