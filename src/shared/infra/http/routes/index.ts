import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use('/categories', categoriesRoutes); // dessa forma todas as rotas terão no começo delas o path /categories
router.use('/specifications', specificationsRoutes); // dessa forma todas as rotas terão no começo delas o path /specifications
router.use('/users', usersRoutes); // dessa forma todas as rotas terão no começo delas o path /users
router.use('/cars', carsRoutes); // dessa forma todas as rotas terão no começo delas o path /cars
router.use(authenticateRoutes); // dessa forma todas as rotas terão no começo delas o path /

export { router };
