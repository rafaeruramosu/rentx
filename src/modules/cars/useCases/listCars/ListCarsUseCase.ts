import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  brand?: string;
  name?: string;
  category_id?: string;
}

class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {} // D => DIP - Dependency Inversion Principle (Princípio da Inversão de Dependência) *SOLID*

  async execute({ brand, name, category_id }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      brand,
      name,
      category_id,
    );

    return cars;
  }
}

export { ListCarsUseCase };
