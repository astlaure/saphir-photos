import { NextFunction, Request, Response } from 'express';

const { APP_URL } = process.env;

const navigation = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session) {
    return next();
  }

  if (!req.session.navigation) {
    req.session.navigation = { previous: APP_URL, current: `${APP_URL}${req.url}` };
  } else {
    req.session.navigation.previous = req.session.navigation.current;
    req.session.navigation.current = `${APP_URL}${req.url}`;
  }

  return next();
};

export default navigation;
