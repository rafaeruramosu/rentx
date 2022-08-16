import { IsNull, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import dataSource from '@shared/infra/typeorm';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = dataSource.getRepository(Rental);
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOneBy({ id });

    return rental;
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ['car'],
    });

    return rentals;
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { user_id, end_date: IsNull() },
    });

    return rental;
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { car_id, end_date: IsNull() },
    });

    return rental;
  }

  async create({
    id,
    car_id,
    user_id,
    expected_return_date,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      car_id,
      user_id,
      expected_return_date,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }
}

export { RentalsRepository };
