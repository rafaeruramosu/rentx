import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

// usando o middleware ensureAuthenticated
specificationsRoutes.use(ensureAuthenticated);

specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
