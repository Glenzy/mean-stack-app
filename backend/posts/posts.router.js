import {
  Router
} from 'express';
import controller from './posts.controller';
import multer from 'multer';

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};
const storage = multer.diskStorage({

  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("invalid mime type");
    if (isValid) {
      error = null;
    }
    callback(error, 'backend/images');
  },
  filename: (req, file, callback) => {
    const originalname = file.originalname.replace(/\?/g, '');
    const name = originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, name + '-' + Date.now() + '.' + ext);
  }
});

const router = Router();
// /api/post
router
  .route('/')
  .get(controller.getMany)
  .post(multer({
      storage: storage
    }).single('image'),
    controller.createOne);
//.post()
// /api/post/:id
router
  .route('/:id')
  .get(controller.getOne)
  .put(multer({
    storage: storage
  }).single('image'), controller.updateOne)
  .delete(controller.removeOne);

//export default router;
module.exports = router;
