import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.POST || 4000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
