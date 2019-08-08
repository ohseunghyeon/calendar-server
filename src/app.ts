import cors from 'cors';
import express from 'express';
import router from './routes';

const app = express();

const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500);
  res.json({ error: 'System Internal Error' });
}

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);

export default app;
