import express from 'express';

import { categoriesRoutes } from './routes/categories.routes';

const app = express();

app.use(express.json());

app.use('/categories', categoriesRoutes); // todas as rotas terão no começo delas o path /categories

app.listen(3333, () => console.log('server is running'));
