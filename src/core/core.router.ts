import express from 'express';

const coreRouter = express.Router();
const { APP_URL } = process.env;

coreRouter.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect(`${APP_URL}/photos`);
  }
  return res.redirect(`${APP_URL}/login`);
})

export default coreRouter;
