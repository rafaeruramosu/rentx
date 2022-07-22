import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUserCase } from './ImportCategoryUseCase';

// const categoriesRepository =
const importCategoryUseCase = new ImportCategoryUserCase();
const importCategoryController = new ImportCategoryController(
  importCategoryUseCase,
);

export { importCategoryController };
