import express from 'express';

const i18nRouter = express.Router();

i18nRouter.get('/language/:lng', (req, res) => {
  res.cookie('i18next', req.params.lng, { httpOnly: true, maxAge: 10 * 365 * 24 * 60 * 60 * 1000 });
  res.redirect(req.session?.navigation.previous);
});

export default i18nRouter;
