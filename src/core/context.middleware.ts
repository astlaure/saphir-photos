import { NextFunction, Request, Response } from 'express';
import User from '../users/user.model';

const context = (req: Request, res: Response, next: NextFunction) => {
  res.locals.csrf = req.csrfToken();
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.role = (req.user as User | null)?.role ?? 'anonymous';

  if (req.session?.flash) {
    res.locals = {
      ...res.locals,
      ...req.session.flash,
    };
    delete req.session.flash;
  }

  return next();
};

export default context;
