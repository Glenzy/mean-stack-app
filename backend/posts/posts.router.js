import {
  Router
} from 'express';
import controller from './posts.controller';
import multer from 'multer';

const router = Router();

// /api/post
router
  .route('/')
  .get(controller.getMany)
  .post(multer({
    storage: controller.storage
  }).single('image'), controller.createOne);

// /api/post/:id
router
  .route('/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.removeOne);

//export default router;
module.exports = router;
