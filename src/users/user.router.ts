import express from 'express';
import User from './user.model';
import BcryptUtil from '../auth/local/bcrypt.util';
import auth from '../auth/auth.middleware';
import UserSchemas from './user.schema';
import Validator from '../core/validator';
import { ValidationException } from '../errors/validation.exception';
import hasRole from '../auth/has-role.middleware';

const userRouter = express.Router();
const { APP_URL } = process.env;

userRouter.get('/admin/users', auth, hasRole('admin'), async (req, res) => {
  const context = {
    users: await User.findAll(),
  };
  return res.render('users/admin/users', context);
});

userRouter.get('/admin/users/create', auth, hasRole('admin'), (req, res) => {
  const context = {};
  return res.render('users/admin/create', context);
});

userRouter.get('/admin/users/update/:id', auth, hasRole('admin'), async (req, res) => {
  const context = {
    user: await User.findByPk(req.params.id),
  };
  return res.render('users/admin/update', context);
});

userRouter.post('/admin/users/create', auth, hasRole('admin'), async (req, res) => {
  try {
    const values = await Validator(UserSchemas.UserCreate, req.body);
    await User.create({ ...values, password: await BcryptUtil.hash(values.password) });
    return res.redirect(`${APP_URL}/admin/users`);
  } catch (err) {
    if (req.session) {
      req.session.flash = {
        ...(err as ValidationException).validations,
      };
    }
    return res.redirect(`${APP_URL}/admin/users/create`);
  }
});

userRouter.post('/admin/users/update/:id', auth, hasRole('admin'), async (req, res) => {
  try {
    const body: { name: string, username: string, password?: string } = {
      name: req.body.name,
      username: req.body.username,
    };
    if (req.body.password) {
      body.password = await BcryptUtil.hash(req.body.password);
    }

    await User.update(body, { where: { id: req.params.id } });
    return res.redirect(`${APP_URL}/admin/users`);
  } catch (err) {
    console.log(err);
    return res.redirect(`${APP_URL}/admin/users`);
  }
});

userRouter.post('/admin/users/delete/:id', auth, hasRole('admin'), async (req, res) => {
  await User.destroy({ where: { id: req.params.id } });
  return res.redirect(`${APP_URL}/admin/users`);
});

export default userRouter;
