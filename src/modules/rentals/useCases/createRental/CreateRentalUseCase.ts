import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {
  constructor(private rentalsRepository: IRentalsRepository) {} // D => DIP - Dependency Inversion Principle (Princípio da Inversão de Dependência) *SOLID*

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<void> {
    const carIsAvailable = await this.rentalsRepository.findOpenRentalByCarId(
      car_id,
    );

    if (!carIsAvailable) {
      throw new AppError('Car not available');
    }

    const rentalOpenToUser =
      await this.rentalsRepository.findOpenRentalByUserId(user_id);

    if (rentalOpenToUser) {
      throw new AppError('There is a rental in progress for user');
    }
  }
}

export { CreateRentalUseCase };
