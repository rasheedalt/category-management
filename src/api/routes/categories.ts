import { Router } from 'express';
import CategoryController from '../controllers/categories';

const categoryRouter = Router();

categoryRouter.get('/', CategoryController.getCategories);
categoryRouter.get('/:id', CategoryController.getCategorySubtree);
categoryRouter.post('/', CategoryController.addCategory);
categoryRouter.patch('/:id', CategoryController.changeCategoryParent);
categoryRouter.delete('/:id', CategoryController.removeCategory);

export default categoryRouter;
