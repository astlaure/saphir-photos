import express from 'express';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import csurf from 'csurf';
import helmet from 'helmet';
import i18nextMiddleware from 'i18next-http-middleware';
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
import i18n from './core/i18n';
import i18nRouter from './core/i18n/i18n.router';
import navigation from './core/navigation.middleware';

const app = express();
const { SECRET_KEY } = process.env;

app.set('view engine', 'hbs');
app.set('views', 'web/views');

helpers.registerHelpers();

app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({ secret: SECRET_KEY, maxAge: 30 * 60 * 1000 }));
app.use(security.initialize());
app.use(security.session());
app.use(security.authenticate('remember-me'));
app.use(csurf());
app.use(i18nextMiddleware.handle(i18n));

app.use(context);
app.use(keepAlive);
app.use(express.static('public'));
app.use(navigation);

app.use('/', photoRouter);
app.use('/', userRouter);
app.use('/', authRouter);
app.use('/', coreRouter);
app.use('/', i18nRouter);
app.use(errorRouter);

app.use(errorHandler);

export default app;
