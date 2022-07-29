import { Router } from 'express';

import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/categories', categoriesRoutes); // todas as rotas terão no começo delas o path /categories
router.use('/specifications', specificationsRoutes); // todas as rotas terão no começo delas o path /specifications
router.use('/users', usersRoutes); // todas as rotas terão no começo delas o path /users

export { router };
