import express, { Express, Request, Response } from "express";
import cors from "cors";

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import actionsRouter from './routes/actions';
import itemsRouter from './routes/items';
import adminRouter from './routes/adminDb';

const app: Express = express()

app.use(cors())
app.use(express.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/actions', actionsRouter);
app.use('/items', itemsRouter);
app.use('/adminDb', adminRouter);

export default app;