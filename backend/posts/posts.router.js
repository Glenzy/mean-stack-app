import {
  Router
} from 'express';
import controller from './posts.controller';

const router = Router();

// /api/post
router
  .route('/')
  .get(controller.getOne)
  .post(controller.createOne)

// /api/post/:id
router
  .route('/:id')
  .get(controller.getOne)
  .put(controller.updateOne)
  .delete(controller.removeOne)

//export default router;
module.exports = router;
