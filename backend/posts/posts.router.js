import {
  Router
} from 'express';

const router = Router();

router.route('/')
  .get()
  .post()
router.route('/:id')
  .get()
  .post()
  .put()
  .delete()

export default router;
