import { Router } from 'express';
import ProductController from '../controllers/product.controllers';

const router = Router();

const productController = new ProductController();

router.post('/', productController.create.bind(productController));
router.get('/', productController.getAll.bind(productController));

export default router;