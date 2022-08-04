import { Repository } from 'typeorm';

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '@modules/cars/repositories/ICategoriesRepository';
import dataSource from '@shared/infra/typeorm';

import { Category } from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  // private static INSTANCE: CategoriesRepository;

  // private constructor() {
  //   this.repository = dataSource.getRepository(Category);
  // }

  // public static getInstance(): CategoriesRepository {
  //   if (!CategoriesRepository.INSTANCE) {
  //     CategoriesRepository.INSTANCE = new CategoriesRepository();
  //   }

  //   return CategoriesRepository.INSTANCE;
  // }

  constructor() {
    this.repository = dataSource.getRepository(Category);
  }

  async findByName(name: string): Promise<Category> {
    const category = this.repository.findOneBy({ name });

    return category;
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    // const category = new Category();

    // Object.assign(category, { name, description, created_at: new Date() }); // Object.assign recebe um objeto de primeiro parametro e de segundo, os atributos que ele precisará passar para dentro do objeto item a item

    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }
}

export { CategoriesRepository };
