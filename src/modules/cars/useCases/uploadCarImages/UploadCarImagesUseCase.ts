import { inject, injectable } from 'tsyringe';

import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarImagesRepository')
    private carImagesRepository: ICarImagesRepository,
  ) {} // D => DIP - Dependency Inversion Principle (Princípio da Inversão de Dependência) *SOLID*

  async execute({ car_id, images_name }: IRequest): Promise<void> {
    images_name.map(async image => {
      await this.carImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImagesUseCase };
