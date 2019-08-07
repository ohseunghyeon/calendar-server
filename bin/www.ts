import app from '../app';

const port = process.env.POST || 4000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
