import path from 'path';
import fs from 'fs';
import express from 'express';
import Photo from './photo.model';
import upload from './photo.middleware';
import auth from '../auth/auth.middleware';
import hasRole from '../auth/has-role.middleware';
import User from '../users/user.model';

const photoRouter = express.Router();
const { APP_URL } = process.env;

photoRouter.get('/photos', auth, async (req, res) => {
  const photos = await Photo.findAll({ where: { userId: (req.user as User).id } });
  const context = {
    id: (req.user as User).id,
    photos,
  }
  return res.render('photos/photos', context);
})

photoRouter.get('/uploads/:filename', auth, async (req, res) => {
  return res.sendFile(path.resolve('uploads', req.params.filename));
})

photoRouter.post('/photos/likes', auth, async (req, res) => {
  try {
    const { id: userId } = (req.user as User);
    const { id, liked } = req.body;
    console.log(id);
    console.log(liked);
    await Photo.update({ liked }, { where: { userId, id } });
    return res.sendStatus(200);
  } catch (err) {
    return res.sendStatus(500);
  }
})

// ADMIN

photoRouter.get('/admin/photos/:id', auth, hasRole('admin'), async (req, res) => {
  const context = {
    id: req.params.id,
    photos: await Photo.findAll({ where: { userId: req.params.id } }),
  }
  return res.render('photos/admin/photos', context);
})

photoRouter.post('/admin/photos/create', auth, hasRole('admin'), upload.array('photos'), async (req, res) => {
  const photos = Array.isArray(req.files)
    ? req.files.map((file) => {
      return { url: `${file.destination}/${file.filename}`, userId: req.body.user };
    }) : [];

  await Photo.bulkCreate(photos);
  return res.redirect(`${APP_URL}/admin/photos/create`);
})

photoRouter.post('/admin/photos/delete/:id', auth, hasRole('admin'), async (req, res) => {
  try {
    const photo = await Photo.findByPk(req.params.id);

    if (photo) {
      await fs.promises.unlink(path.resolve(photo.url));
      await Photo.destroy({ where: { id: photo.id } });
    }
  } catch (err) {
    console.log(err);
  }

  return res.redirect(`${APP_URL}/admin/users`);
})

export default photoRouter;
