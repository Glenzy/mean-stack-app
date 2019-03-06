import config from '../config';
import {
  User
} from '../user/user.model';
import jwt from 'jsonwebtoken';

export const newToken = user => {
  return jwt.sign({
    id: user.id
  }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  });
};

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload);
    });
  });



export const signup = async (req, res) => {
  console.log('REQ', req.body);
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: 'need email and password'
    });
  }

  try {
    const user = await User.create(req.body)
    const token = newToken(user)
    return res.status(201).send({
      token
    });
  } catch (e) {
    return res.status(400).end();
  }
};



export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send('Email and password required');
  }
  const user = await findOne({
    email: req.body.email
  });
  if (!user) {
    res.status(401).end();
  }
  try {
    const checkUserPassword = await user.checkPassword(req.body.password);
    if (!checkUserPassword) {
      res.status(401).end();
    }

    const token = newToken(user);
    return res.status(200).send({
      token
    });

  } catch (error) {
    console.log('Error with password check ', error);
    res.status(401).end();
  }
};
export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end();
  }

  const token = bearer.split('Bearer ')[1].trim();
  let payload;
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).end();
  }

  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec();

  if (!user) {
    return res.status(401).end();
  }

  req.user = user;
  next();
};
