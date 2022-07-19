import { Category } from '../model/Category';

// DTO -> Data transfer object -> objeto responsável por pegar as informações recebidas pelas rotas e transferir para os repositórios
interface ICreateCategoryDTO {
  // 'I' -> interface | 'Create' -> oque a interface fará | 'Category' -> recurso | 'DTO' -> indica que será um objeto DTO
  name: string;
  description: string;
}

class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, { name, description, created_at: new Date() }); // Object.assign recebe um objeto de primeiro parametro e de segundo, os atributos que ele precisará passar para dentro do objeto item a item

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find(category => category.name === name);

    return category;
  }
}

export { CategoriesRepository };
