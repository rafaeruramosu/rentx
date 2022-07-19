import { Request, Response, Router } from 'express';

import { Category } from '../model/Category';

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;

  const category = new Category();

  Object.assign(category, { name, description, created_at: new Date() }); // Object.assign recebe um objeto de primeiro parametro e de segundo, os atributos que ele precisará passar para dentro do objeto item a item

  categories.push(category);

  return response.status(201).json(category);
});

export { categoriesRoutes };
