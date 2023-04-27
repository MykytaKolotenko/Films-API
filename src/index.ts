import express from 'express';

const app = express();

app.get('/', (req, res) => {
  console.log(req.query);
  res.send('Hello, Genie!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
