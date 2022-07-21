import { Router } from 'express';

import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';

const router = Router();

router.use('/categories', categoriesRoutes); // todas as rotas terão no começo delas o path /categories
router.use('/specifications', specificationsRoutes);

export { router };
