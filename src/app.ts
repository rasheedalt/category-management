import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import responseHelper from './helper/response';
import categoryRouter from './api/routes/categories';
import customErrorHandler from './helper/errorHandler';
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/', (req: any, res: any) => {
  res.json({ message: 'Category Management using Node.js, Express, and Postgres API' });
});

app.use('/api/category', categoryRouter);

app.use(customErrorHandler);

// handle 404 errors
app.use((req: any, res: any, _next: any): void => {
  res.status(404).json({
    status: false,
    message: 'resource not found',
    data: null,
    path: req.url,
  });
});

app.use((err: any, req: any, res: any): void => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json(err);
});

export default app;
