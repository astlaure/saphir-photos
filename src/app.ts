import express from 'express';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import hbs from 'hbs';
import csurf from 'csurf';
import security from './auth';
import photoRouter from './photos/photo.router';
import userRouter from './users/user.router';
import authRouter from './auth/auth.router';
import errorRouter from './errors/error.router';
import errorHandler from './errors/error.handler';
import coreRouter from './core/core.router';
import context from './core/context.middleware';
import helpers from './core/helpers';
import keepAlive from './auth/keep-alive.middleware';

const app = express();
const { SECRET_KEY } = process.env;

app.set('view engine', 'hbs');
app.set('views', 'web/views');

helpers.registerHelpers();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({ secret: SECRET_KEY, maxAge: 30 * 60 * 1000 }));
app.use(security.initialize());
app.use(security.session());
app.use(security.authenticate('remember-me'));
app.use(csurf());

app.use(context);
app.use(keepAlive);
app.use(express.static('public'));

app.use('/', photoRouter);
app.use('/', userRouter);
app.use('/', authRouter);
app.use('/', coreRouter);
app.use(errorRouter);
app.use(errorHandler);

export default app;
