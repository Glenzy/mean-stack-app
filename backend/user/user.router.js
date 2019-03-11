import {
  Router
} from 'express';
import controller from './user.controller';

const router = Router();

router
  .route('/:id')
  .get()
  .put()
  .delete();

module.exports = router;
