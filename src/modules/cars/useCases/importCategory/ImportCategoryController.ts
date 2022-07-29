import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryUserCase } from './ImportCategoryUseCase';

class ImportCategoryController {
  handle(request: Request, response: Response): Response {
    const { file } = request;

    const importCategoryUseCase = container.resolve(ImportCategoryUserCase);

    importCategoryUseCase.execute(file);

    return response.send();
  }
}

export { ImportCategoryController };
