import cors from 'cors';
import express from 'express';
import { events } from './db';

const app = express();

app.use(cors())

app.get('/events', (req, res) => {
  res.json(events);
});

const port = process.env.POST || 4000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
