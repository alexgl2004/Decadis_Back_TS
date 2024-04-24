import express, { Express, Request, Response } from "express";
import cors from "cors";

import  { dbGenerate } from './db_add'

dbGenerate()

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import actionsRouter from './routes/actions';
import itemsRouter from './routes/items';


const app: Express = express()

app.use(cors())
app.use(express.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/actions', actionsRouter);
app.use('/items', itemsRouter);


export default app;