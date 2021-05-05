import express from 'express';

const errorRouter = express.Router();

errorRouter.get('/500', (req, res) => {
  return res.render('errors/500');
});

errorRouter.get('*', (req, res) => {
  return res.render('errors/404');
});

export default errorRouter;
