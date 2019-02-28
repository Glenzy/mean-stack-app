import {
  crudControllers
} from '../utils/crud';
import {
  Posts
} from './posts.model';
import
multer
from 'multer';

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
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, name + '-' + Date.now() + '.' + ext);
  }
});


export default {
  ...crudControllers(Posts),
  createOne((req, res) {
      console.log('Create one on db called', req.body);
      console.log('Create one on db called', req.file);
      try {
        const doc = await model.create({
          ...req.body
        })
        res.status(201).json({
          data: doc,
          id: doc._id
        })
      } catch (error) {
        console.log('Error writing data', error);
        res.status(400).end();
      })
  }
