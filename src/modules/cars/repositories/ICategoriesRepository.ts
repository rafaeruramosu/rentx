import { Category } from '../entities/Category';

// DTO -> Data transfer object -> objeto responsável por pegar as informações recebidas pelas rotas e transferir para os repositórios
interface ICreateCategoryDTO {
  // 'I' -> interface | 'Create' -> oque a interface fará | 'Category' -> recurso | 'DTO' -> indica que será um objeto DTO
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
