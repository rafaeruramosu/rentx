import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter(s => ids.includes(s.id));

    return specifications;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(s => s.name === name);

    return specification;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, { name, description });

    this.specifications.push(specification);
  }
}

export { SpecificationsRepositoryInMemory };
