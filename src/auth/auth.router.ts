import express from 'express';
import security from './index';
import auth from './auth.middleware';
import TokenUtil from './remember-me/token.util';
import User from '../users/user.model';

const authRouter = express.Router();
const local = security.authenticate('local', { session: true });
const { APP_URL } = process.env;

authRouter.get('/login', (req, res) => {
  const context = {};
  return res.render('auth/login', context);
})

authRouter.post('/login', local, async (req, res) => {
  if (req.body.remember_me) {
    const token = await TokenUtil.issue(req.user as User);
    res.cookie('remember-me', token, { path: '/', httpOnly: true, maxAge: 604800000 })
  }
  return res.redirect(`${APP_URL}/admin/users`);
})

authRouter.post('/logout', auth, (req, res) => {
  req.logout();
  return res.redirect(APP_URL!);
})

export default authRouter;
